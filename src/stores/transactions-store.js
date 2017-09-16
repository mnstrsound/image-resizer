import { action, observable } from 'mobx';

import TransactionsService from '../services/transactions-service';

class Transactions {
    @observable transactions = [];

    constructor(transactions) {
        this.transactions = transactions;
    }

    getCardSpendingTransactions(id) {
        return this.transactions[id].find(transaction => transaction.TransactionSum < 0);
    }
}

export default Transactions;
