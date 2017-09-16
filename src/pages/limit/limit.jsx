import React from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';

import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import { LinearProgress } from 'material-ui/Progress';
import ArrowLeftIcon from 'material-ui-icons/KeyboardArrowLeft';
import Typography from 'material-ui/Typography';

import CustomAppBar from '../../components/custom-app-bar';
import ActionButton from '../../components/action-button';
import ConfirmationDialog from '../../components/confirmation-dialog';
import NavigationController from '../../controllers/navigation-controller';

import styles from './styles';

const getRandomProgress = () => Math.floor(Math.random() * 100) + 1;

@withStyles(styles)
@inject(({ limitsStore, transactionsStore, cardsStore, createStore }) => ({
    limitsStore,
    transactionsStore,
    cardsStore,
    createStore
}))
@observer
class Main extends React.Component {
    state = {
        open: false
    }

    handleEditButtonClick = () => {
        const { id } = this.props.match.params;
        NavigationController.toEditScreen(id);
    }

    render() {
        console.log(this.props);
        const { id } = this.props.match.params;
        const limit = this.props.limitsStore.limits.find(item => item._id == id);
        const card = this.props.cardsStore.cards.find(card => card.CardId === limit.cardId);

        const spendingTransactions = this.props.transactionsStore.transactions[limit.cardId]
            .filter(item => item.TransactionSum < 0)

        return (
            <div className={ this.props.classes.limit }>
                { this.renderCustomAppBar() }
                { this.renderDeleteConfirmationModal() }
                <Avatar>{ limit.name[0] }</Avatar>
                { limit.name }
                <LinearProgress
                    mode='determinate'
                    value={ getRandomProgress() }
                />
                { spendingTransactions.map(item => (
                    <div>
                        <div>{ item.TransactionPlace }</div>
                        <div>{ item.TransactionSum }</div>
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
}

export default Main;
