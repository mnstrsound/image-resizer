import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { observer, inject } from 'mobx-react';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Tabs, { Tab } from 'material-ui/Tabs';
import { LinearProgress } from 'material-ui/Progress';
import Typography  from 'material-ui/Typography';
import ArrowLeftIcon from 'material-ui-icons/KeyboardArrowLeft';
import AddIcon from 'material-ui-icons/Add';

import NavigationController from '../../controllers/navigation-controller';
import CustomAppBar from '../../components/custom-app-bar';
import styles from './styles';

const getRandomProgress = (limit, transactions) => {
    const { cardId, categoriesIds, amount } = limit;
    let sum = 0;

    transactions[cardId].forEach((transaction) => {
        if (categoriesIds.indexOf(transaction.categoryId) !== -1 && transaction.TransactionSum < 0) {
            sum += -(transaction.TransactionSum);
        }
    });

    return sum / amount * 100;
};

@withStyles(styles)
@inject(({ limitsStore, cardsStore, transactionsStore }) => ({
    limitsStore,
    cardsStore,
    transactionsStore
}))
@observer
class Main extends React.Component {
    state = {
        activeTabIndex: 0
    }

    handleCreateButtonClick = () => {
        NavigationController.toCreateScreen();
    }

    componentWillMount() {
        this.props.limitsStore.getLimits();
    }

    render() {
        return (
            <div className={ this.props.classes.main }>
                { this.renderCustomAppBar() }
                { this.props.limitsStore.limits.length > 0 && this.renderTabs() }
                { this.props.limitsStore.limits.length ? this.renderSwipeableLimits() : this.renderGreeting() }
            </div>
        );
    }

    renderCustomAppBar() {
        return (
            <CustomAppBar
                leftAddon={ <ArrowLeftIcon /> }
                rightAddon={ <AddIcon onClick={ this.handleCreateButtonClick } /> }
                title='Лимиты'
            />
        );
    }

    renderTabs() {
        return (
            <AppBar className={ this.props.classes.bar }>
                <Tabs
                    value={ this.state.activeTabIndex }
                    onChange={ (e, index) => { this.setState({ activeTabIndex: index }); } }
                    fullWidth={ true }
                >
                    { ['День', 'Неделя', 'Месяц'].map(item => (
                        <Tab
                            key={ item }
                            label={ item }
                        />
                    )) }
                </Tabs>
            </AppBar>
        );
    }

    renderGreeting() {
        return (
            <div className={ this.props.classes.greeting }>
                <Typography className={ this.props.classes.greetingText }>
                    Лимиты - это отличный спосок контролировать свои траты.
                </Typography>
                <Button
                    raised={ true }
                    color='accent'
                    className={ this.props.classes.createButton }
                    onClick={ this.handleCreateButtonClick }
                >
                    Создать лимит
                </Button>
            </div>
        );
    }

    renderSwipeableLimits() {
        return (
            <div className={ this.props.classes.limits }>
                <SwipeableViews
                    index={ this.state.activeTabIndex }
                >
                    <div className={ this.props.classes.tabContainer }>{ this.renderLimits() }</div>
                    <div className={ this.props.classes.tabContainer }>{ this.renderLimits() }</div>
                    <div className={ this.props.classes.tabContainer }>{ this.renderLimits() }</div>
                </SwipeableViews>
            </div>
        );
    }

    renderLimits() {
        const { limitsStore: { limits }, transactionsStore: { transactions } } = this.props;
        return (
            <List>
                { limits.map(limit => (
                    <div key={ limit.title }>
                        <ListItem
                            dense={ true }
                            button={ true }
                            onClick={ () => NavigationController.toLimitScreen(limit._id) }
                        >
                            <Avatar>{ limit.name[0] }</Avatar>
                            <ListItemText
                                primary={ limit.name }
                            />
                        </ListItem>
                        <LinearProgress
                            mode='determinate'
                            value={ getRandomProgress(limit, transactions) }
                        />
                        <Divider />
                    </div>
                )) }
            </List>
        );
    }
}


export default Main;
