import React from 'react';

import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';

import Categories from '../../constants/categories';
import styles from './styles';

@withStyles(styles)
class Transaction extends React.Component {
    render() {
        const { transaction } = this.props;
        const category = Categories.find(category => category.id === transaction.categoryId);
        return (
            <div>
                <ListItem
                    dense={ true }
                    button={ true }
                >
                    <Avatar>{ transaction.TransactionPlace[0] }</Avatar>
                    <ListItemText
                        primary={ transaction.TransactionPlace }
                        secondary={ category.title }
                    />
                </ListItem>
                <Typography>
                    Потрачено: { transaction.TransactionSum }
                </Typography>
            </div>
        );
    }
}

export default Transaction;
