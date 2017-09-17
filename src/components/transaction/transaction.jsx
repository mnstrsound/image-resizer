import React from 'react';

import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';

import Categories from '../../constants/categories';
import styles from './styles';

@withStyles(styles)
class Transaction extends React.Component {
    render() {
        const { transaction, classes } = this.props;
        const category = Categories.find(category => category.id === transaction.categoryId);
        return (
            <div>
                <ListItem
                    dense={ true }
                    button={ true }
                >
                    <Avatar className={ classes.transactionAvatar } >
                        { transaction.TransactionPlace[0].toUpperCase() }
                    </Avatar>
                    <ListItemText
                        primary={ transaction.TransactionPlace }
                        secondary={ category.title }
                    />
                    <ListItemSecondaryAction>
                        <Typography className={ classes.transactionSum }>
                            { transaction.TransactionSum } ₽
                        </Typography>
                    </ListItemSecondaryAction>
                </ListItem>
            </div>
        );
    }
}

export default Transaction;
