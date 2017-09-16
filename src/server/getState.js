import request from './lib/request';
import Categories from '../constants/categories';

// Почему тут такая колбаса? Потому что сервер падает с 503 при нескольких параллельных запросах
export default () => (
    new Promise((resolve, reject) => {
        const state = { cards: [], transactions: {}, categories: Categories };
        const fetchCardTransactions = index => (
            request.post('https://api.open.ru/MyCards/1.0.0/MyCardsInfo/history', { CardId: state.cards[index].CardId })
                .then((data) => {
                    const transactions = data.CardTransactionsList[0].CardTransaction.map((transaction) => {
                        const category = Categories.find(category => (
                            category.pattern.test(transaction.TransactionPlace)
                        ));

                        const categoryId = category ? category.id : null;

                        return { ...transaction, categoryId };
                    });

                    state.transactions[data.CardId] = transactions;

                    if (index === state.cards.length - 1) resolve(state);
                })
                .catch(e => reject(e))
        );

        request.get('https://api.open.ru/MyCards/1.0.0/MyCardsInfo/cardlist')
            .then((data) => {
                state.cards = data.Cards.Card;
                const fetchCardsTransactions = fetchCardTransactions(0);

                for (let i = 1; i < state.cards.length; i++) {
                    fetchCardsTransactions.then(() => { fetchCardTransactions(i); });
                }
            }).catch(e => reject(e));
    })
);
