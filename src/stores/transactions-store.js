import { observable } from 'mobx';

class TransactionsStore {
    @observable transactions = [];

    constructor(transactions) {
        this.transactions = transactions;
    }
}

export default TransactionsStore;
