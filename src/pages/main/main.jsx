import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { observer, inject } from 'mobx-react';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Tabs, { Tab } from 'material-ui/Tabs';
import { LinearProgress } from 'material-ui/Progress';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import ArrowLeftIcon from 'material-ui-icons/KeyboardArrowLeft';
import AddIcon from 'material-ui-icons/Add';

import NavigationController from '../../controllers/navigation-controller';
import CustomAppBar from '../../components/custom-app-bar';
import styles from './styles';

const getRandomProgress = () => Math.floor(Math.random() * 100) + 1;

@withStyles(styles)
@inject(({ categoriesStore, limitsStore, cardsStore, transactionsStore }) => ({
    categoriesStore,
    limitsStore,
    cardsStore,
    transactionsStore
}))
@observer
class Main extends React.Component {
    state = {
        activeTabIndex: 0
    }

    handleAddIconClick = () => {
        NavigationController.toCreateScreen();
    }

    componentWillMount() {
        this.props.limitsStore.getLimits();
    }

    render() {
        return (
            <div className={ this.props.classes.main }>
                { this.renderCustomAppBar() }
                { this.renderTabs() }
                { this.renderSwipeableLimits() }
                { this.renderBottomNavigation() }
            </div>
        );
    }

    renderCustomAppBar() {
        return (
            <CustomAppBar
                leftAddon={ <ArrowLeftIcon /> }
                rightAddon={ <AddIcon onClick={ this.handleAddIconClick } /> }
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

    renderSwipeableLimits() {
        return (
            <SwipeableViews
                index={ this.state.activeTabIndex }
            >
                <div className={ this.props.classes.tabContainer }>{ this.renderLimits() }</div>
                <div className={ this.props.classes.tabContainer }>{ this.renderLimits() }</div>
                <div className={ this.props.classes.tabContainer }>{ this.renderLimits() }</div>
            </SwipeableViews>
        );
    }

    renderLimits() {
        return (
            <List>
                { this.props.limitsStore.limits.map(limit => (
                    <div key={ limit.title }>
                        <ListItem
                            dense={ true }
                            button={ true }
                            onClick={ () => NavigationController.toLimitScreen(limit.id) }
                        >
                            <Avatar>{ limit.name[0] }</Avatar>
                            <ListItemText primary={ limit.name } />
                        </ListItem>
                        <LinearProgress mode='determinate' value={ getRandomProgress() } />
                        <Divider />
                    </div>
                )) }
            </List>
        );
    }

    renderBottomNavigation() {
        return (
            <BottomNavigation
                showLabels={ true }
                className={ this.props.classes.bottomNavigation }
            >
                { this.props.cardsStore.cards.map(card => (
                    <BottomNavigationButton
                        label={ card.CardName }
                    />
                )) }
            </BottomNavigation>
        );
    }
}


export default Main;
