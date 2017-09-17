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
import { getPeriodByIndex } from '../../utils/helpers';
import styles from './styles';
import Limit from '../../components/limit';

@withStyles(styles)
@inject(({ limitsStore, transactionsStore, cardsStore }) => ({
    limitsStore,
    transactionsStore,
    cardsStore
}))
@observer
class Main extends React.Component {
    state = {
        activeTabIndex: 0
    }

    handleCreateButtonClick = () => {
        NavigationController.toCreateScreen();
    }

    handleLimitClick = (id) => {
        const { activeTabIndex } = this.state;
        let period = 'month';
        switch (activeTabIndex) {
            case 0:
                period = 'day';
                break;
            case 1:
                period = 'week';
                break;
        }
        NavigationController.toLimitScreen(id, period);
    }

    componentWillMount() {
        this.props.limitsStore.getLimits();
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={ classes.main }>
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
        const { classes } = this.props;
        return (
            <AppBar className={ classes.bar }>
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
        const { classes } = this.props;
        return (
            <div className={ classes.greeting }>
                <Typography className={ classes.greetingText }>
                    Лимиты - это отличный спосок контролировать свои траты.
                </Typography>
                <Button
                    raised={ true }
                    color='accent'
                    className={ classes.createButton }
                    onClick={ this.handleCreateButtonClick }
                >
                    Создать лимит
                </Button>
            </div>
        );
    }

    renderSwipeableLimits() {
        const { classes } = this.props;
        return (
            <div className={ classes.limits }>
                <SwipeableViews
                    index={ this.state.activeTabIndex }
                >
                    <div className={ classes.tabContainer }>{ this.renderLimits() }</div>
                    <div className={ classes.tabContainer }>{ this.renderLimits() }</div>
                    <div className={ classes.tabContainer }>{ this.renderLimits() }</div>
                </SwipeableViews>
            </div>
        );
    }

    renderLimits() {
        const {
            limitsStore: { limits },
            transactionsStore: { transactions },
            cardsStore: { cards }
        } = this.props;
        const period = getPeriodByIndex(this.state.activeTabIndex);

        return (
            <List>
                { limits.map((limit, index) => (
                    <Limit
                        key={ index }
                        period={ period }
                        transactions={ transactions }
                        limit={ limit }
                        card={ cards[limit.cardId] }
                        onClick={ this.handleLimitClick }
                    />
                )) }
            </List>
        );
    }
}


export default Main;
