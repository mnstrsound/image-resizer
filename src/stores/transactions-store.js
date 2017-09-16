import { action, observable } from 'mobx';

import TransactionsService from '../services/transactions-service';

class Transactions {
    @observable transactions = [];

    constructor(transactions) {
        this.transactions = transactions;
    }
}

export default Transactions;
