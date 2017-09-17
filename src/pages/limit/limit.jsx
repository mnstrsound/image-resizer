import React from 'react';
import { observer, inject } from 'mobx-react';

import { withStyles } from 'material-ui/styles';
import ArrowLeftIcon from 'material-ui-icons/KeyboardArrowLeft';
import Typography from 'material-ui/Typography';

import CustomAppBar from '../../components/custom-app-bar';
import ActionButton from '../../components/action-button';
import ConfirmationDialog from '../../components/confirmation-dialog';
import LimitItem from '../../components/limit';
import Transaction from '../../components/transaction';
import NavigationController from '../../controllers/navigation-controller';
import { getTransactionsTotalSum } from '../../utils/helpers';

import styles from './styles';

@withStyles(styles)
@inject(({ limitsStore, transactionsStore, cardsStore }) => ({
    limitsStore,
    transactionsStore,
    cardsStore
}))
@observer
class Limit extends React.Component {
    state = {
        open: false
    }

    handleEditButtonClick = () => {
        const { id } = this.props.match.params;
        NavigationController.toEditScreen(id);
    }

    render() {
        const {
            match: { params: { id } },
            limitsStore: { limits },
            cardsStore: { cards }
        } = this.props;
        const limit = limits.find(limit => limit._id === id);
        const card = cards[limit.cardId];
        const transactions = this.getTransactions();
        const groupedTransactions = transactions
            .reduce((acc, transaction) => {
                if (!acc[transaction.TransactionDate]) acc[transaction.TransactionDate] = [];
                acc[transaction.TransactionDate].push(transaction);
                return acc;
            }, {});
        const transactionsSum = getTransactionsTotalSum(transactions);

        return (
            <div className={ this.props.classes.limit }>
                { this.renderCustomAppBar() }
                { this.renderDeleteConfirmationModal() }
                <LimitItem
                    limit={ limit }
                    card={ card }
                    spendingSum={ transactionsSum }
                />
                { Object.keys(groupedTransactions).map(key => (
                    <div>
                        <Typography>{ key }</Typography>
                        { groupedTransactions[key].map((transaction, index) => (
                            <Transaction
                                key={ index }
                                transaction={ transaction }
                            />
                        )) }
                    </div>
                )) }
            </div>
        );
    }

    renderDeleteConfirmationModal() {
        const { id } = this.props.match.params;
        return (
            <ConfirmationDialog
                open={ this.state.open }
                title='Удалить лимит?'
                onClose={ () => { this.setState({ open: false }); } }
                onConfirm={ () => { this.props.limitsStore.deleteLimit(id); } }
            >
                <Typography>Подтвердите удаление лимита</Typography>
            </ConfirmationDialog>
        );
    }

    renderCustomAppBar() {
        const options = [
            { text: 'Редактировать', handler: this.handleEditButtonClick },
            { text: 'Удалить', handler: () => { this.setState({ open: true }); } }
        ];
        return (
            <CustomAppBar
                leftAddon={ <ArrowLeftIcon onClick={ () => this.props.history.goBack() } /> }
                rightAddon={ <ActionButton options={ options } /> }
                title='Лимит'
            />
        );
    }

    getTransactions() {
        const {
            match: { params: { id } },
            limitsStore: { limits },
            transactionsStore: { transactions }
        } = this.props;
        const limit = limits.find(limit => limit._id === id);

        return transactions[limit.cardId]
            .filter(transaction => limit.categoriesIds.includes(transaction.categoryId))
            .sort((prevTransaction, nextTransaction) => {
                let result = 0;
                if (prevTransaction.TransactionDate < nextTransaction.TransactionDate) result = 1;
                if (prevTransaction.TransactionDate > nextTransaction.TransactionDate) result = -1;
                return result;
            });
    }
}

export default Limit;
