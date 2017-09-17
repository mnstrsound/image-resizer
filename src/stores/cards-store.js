import { observable } from 'mobx';

class CardsStore {
    @observable cards = {};

    constructor(cards) {
        this.cards = cards;
    }
}

export default CardsStore;
