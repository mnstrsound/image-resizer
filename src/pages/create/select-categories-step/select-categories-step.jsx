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
        const { limit, categoriesStore: { categories } } = this.props;
        return (
            <List>
                { categories.map(category => (
                    <div
                        key={ category.id }
                        onClick={ () => { limit.toggleCategoryId(category.id); } }
                    >
                        <ListItem
                            dense={ true }
                            button={ true }
                        >
                            <Avatar>H</Avatar>
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
