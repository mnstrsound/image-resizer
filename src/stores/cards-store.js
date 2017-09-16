import { action, observable } from 'mobx';

class Cards {
    @observable cards = [];

    constructor(cards) {
        this.cards = cards;
    }
}

export default Cards;
