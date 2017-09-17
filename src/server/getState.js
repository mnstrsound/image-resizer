import request from './lib/request';

import Categories from '../constants/categories';
import { generateTransactions } from '../utils/helpers';

// Почему тут такая колбаса? Потому что сервер падает с 503 при нескольких параллельных запросах
export default () => (
    new Promise((resolve, reject) => {
        const state = { cards: {}, transactions: {}, categories: Categories };
        const fetchCardTransactions = index => (
            // TODO!!
            request.post('https://api.open.ru/MyCards/1.0.0/MyCardsInfo/history', { CardId: state.cards[Object.keys(state.cards)[index]].CardId })
                .then((data) => {
                    // Склеиваем со сгенерированными транзакциями
                    let transactions = data.CardTransactionsList[0].CardTransaction.concat(generateTransactions());

                    // Цепляем к транзакции категорию
                    transactions = transactions.map((transaction) => {
                        console.log(transaction);
                        const category = Categories.find(category => (
                            category.pattern.test(transaction.TransactionPlace)
                        ));

                        const categoryId = category ? category.id : null;

                        return { ...transaction, categoryId };
                    });

                    // Оставляем только транзакции с тратами
                    transactions = transactions.filter(transaction => transaction.TransactionSum < 0);

                    state.transactions[data.CardId] = transactions;

                    if (index === Object.keys(state.cards).length - 1) resolve(state);
                })
                .catch(e => reject(e))
        );

        request.get('https://api.open.ru/MyCards/1.0.0/MyCardsInfo/cardlist')
            .then((data) => {
                // WATCH HERE
                state.cards = data.Cards.Card.reduce((acc, card) => {
                    acc[card.CardId] = card;
                    return acc;
                }, {});
                const fetchCardsTransactions = fetchCardTransactions(0);

                for (let i = 1; i < data.Cards.Card.length; i++) {
                    fetchCardsTransactions.then(() => { fetchCardTransactions(i); });
                }
            }).catch(e => reject(e));
    })
);
