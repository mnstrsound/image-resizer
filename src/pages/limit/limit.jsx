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
@inject(({ limitsStore, transactionsStore }) => ({
    limitsStore,
    transactionsStore
}))
@observer
class Main extends React.Component {
    state = {
        open: false
    }

    render() {
        const id = this.props.match.params.id;
        const limit = this.props.limitsStore.limits.find(item => item.id == id);
        // console.log(this.props.transactionsStore);
        const spendingTransactions = this.props.transactionsStore.transactions[limit.cardId].filter(item => item.TransactionSum < 0)
        console.log(id, this.props.transactionsStore.transactions[limit.cardId]);
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
        return (
            <ConfirmationDialog
                open={ this.state.open }
                title='Удалить лимит?'
                onClose={ () => { this.setState({ open: false }); } }
                onConfirm={ () => { this.setState({ open: false }); console.log('confirmed'); } }
            >
                <Typography>Подтвердите удаление лимита</Typography>
            </ConfirmationDialog>
        );
    }

    renderCustomAppBar() {
        const options = [
            { text: 'Редактировать', handler: () => NavigationController.toCreateScreen() },
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
