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
            cardsStore: { cards },
            transactionsStore: { transactions }
        } = this.props;
        const limit = limits.find(item => item._id === id);
        const card = cards.find(card => card.CardId === limit.cardId);

        return (
            <div className={ this.props.classes.limit }>
                { this.renderCustomAppBar() }
                { this.renderDeleteConfirmationModal() }
                <LimitItem
                    limit={ limit }
                    transactions={ transactions[limit.cardId] }
                />
                { transactions[limit.cardId].map((transaction, index) => (
                    <Transaction
                        key={ index }
                        transaction={ transaction }
                    />
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
}

export default Limit;
