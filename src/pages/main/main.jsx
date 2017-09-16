import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { observer, inject } from 'mobx-react';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import List from 'material-ui/List';
import Button from 'material-ui/Button';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import AddIcon from 'material-ui-icons/Add';

import NavigationController from '../../controllers/navigation-controller';
import CustomAppBar from '../../components/custom-app-bar';
import styles from './styles';
import Limit from '../../components/limit';

@withStyles(styles)
@inject(({ limitsStore, transactionsStore }) => ({
    limitsStore,
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
                { limits.map((limit, index) => (
                    <Limit
                        key={ index }
                        limit={ limit }
                        transactions={ transactions[limit.cardId] }
                    />
                )) }
            </List>
        );
    }
}


export default Main;
