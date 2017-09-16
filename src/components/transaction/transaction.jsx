import React from 'react';

import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';

import styles from './styles';

@withStyles(styles)
class Transaction extends React.Component {
    render() {
        const { transaction } = this.props;

        return (
            <div>
                <ListItem
                    dense={ true }
                    button={ true }
                >
                    <Avatar>{ transaction.TransactionPlace[0] }</Avatar>
                    <ListItemText
                        primary={ transaction.TransactionPlace }
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
