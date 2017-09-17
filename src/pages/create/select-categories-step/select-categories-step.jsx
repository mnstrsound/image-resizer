import React from 'react';
import { observer, inject } from 'mobx-react';

import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

import styles from './styles';

@withStyles(styles)
@inject(({ categoriesStore }) => ({ categoriesStore }))
@observer
class SelectCategoriesStep extends React.Component {
    render() {
        const { limit, categoriesStore: { categories }, classes } = this.props;
        return (
            <List className={ classes.categories }>
                { categories.map(category => (
                    <div
                        key={ category.id }
                        onClick={ () => { limit.toggleCategoryId(category.id); } }
                    >
                        <ListItem
                            dense={ true }
                            button={ true }
                        >
                            <Avatar className={ classes.categoryAvatar }>{ category.title[0].toUpperCase() }</Avatar>
                            <ListItemText primary={ category.title } />
                            <Checkbox checked={ limit.hasCategory(category.id) } />
                        </ListItem>
                        <Divider />
                    </div>
                )) }
            </List>
        );
    }
}

export default SelectCategoriesStep;
