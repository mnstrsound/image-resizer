import { observable } from 'mobx';

class Transactions {
    @observable transactions = [];

    constructor(transactions) {
        this.transactions = transactions;
    }
}

export default Transactions;
