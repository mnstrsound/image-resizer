import request from '../lib/request';

import CardsService from './cards-service';

export default {
    fetchTransactions: async () => {
        const cards = await CardsService.fetchCards();
        // console.log(cards);
        // const transactions = await Promise.all(cards.map(card => {
        //     const { CardId } = card;
        //     return request.post('MyCards/1.0.0/MyCardsInfo/history', { CardId });
        // }));
        // return transactions;
    }
};
