import request from '../lib/request';

export default {
    fetchCards: () => request.get('MyCards/1.0.0/MyCardsInfo/cardlist').then(res => res.Cards.Card),
    getCardInfo: cardId => request.post('MyCards/1.0.0/MyCardsInfo/info', { CardId: cardId }).then(res => res)
};
