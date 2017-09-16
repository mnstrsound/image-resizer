import React from 'react';
import { observer, inject } from 'mobx-react';

import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

import styles from './styles';

@withStyles(styles)
@inject(({ createStore, categoriesStore }) => ({
    createStore,
    categoriesStore
}))
@observer
class FirstStep extends React.Component {
    render() {
        return (
            <List>
                { this.props.categoriesStore.categories.map(category => (
                    <div
                        key={ category.title }
                        onClick={ () => { this.props.createStore.toggleCategory(category); } }
                    >
                        <ListItem
                            dense={ true }
                            button={ true }
                        >
                            <Avatar>H</Avatar>
                            <ListItemText primary={ category.title } />
                            <Checkbox checked={ this.props.createStore.hasCategory(category) } />
                        </ListItem>
                        <Divider />
                    </div>
                )) }
            </List>
        );
    }
}

export default FirstStep;
