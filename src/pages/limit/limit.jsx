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
import { getTransactionsByPeriod } from '../../utils/helpers';

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
            match: { params: { id, period } },
            limitsStore: { limits },
            cardsStore: { cards },
            transactionsStore: { transactions },
            classes
        } = this.props;
        const limit = limits.find(limit => limit._id === id);
        const card = cards[limit.cardId];
        const sortedTransactions = this.getTransactions();
        const groupedTransactions = sortedTransactions
            .reduce((acc, transaction) => {
                if (!acc[transaction.TransactionDate]) acc[transaction.TransactionDate] = [];
                acc[transaction.TransactionDate].push(transaction);
                return acc;
            }, {});

        return (
            <div className={ classes.limit }>
                { this.renderCustomAppBar() }
                { this.renderDeleteConfirmationModal() }
                <div className={ classes.limitItem }>
                    <LimitItem
                        period={ period }
                        limit={ limit }
                        card={ card }
                        transactions={ transactions }
                    />
                </div>
                <div className={ classes.transactions }>
                    { Object.keys(groupedTransactions).map((key, index) => (
                        <div
                            key={ index }
                            className={ classes.transactionsGroup }
                        >
                            <Typography className={ classes.transactionsDate }>{ key }</Typography>
                            { groupedTransactions[key].map((transaction, index) => (
                                <Transaction
                                    key={ index }
                                    transaction={ transaction }
                                />
                            )) }
                        </div>
                    )) }
                </div>
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
            match: { params: { id, period } },
            limitsStore: { limits },
            transactionsStore: { transactions }
        } = this.props;
        const limit = limits.find(limit => limit._id === id);

        return getTransactionsByPeriod(transactions[limit.cardId], period)
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
