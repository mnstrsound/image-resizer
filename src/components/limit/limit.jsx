import React from 'react';

import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { LinearProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';

import NavigationController from '../../controllers/navigation-controller';
import styles from './styles';

@withStyles(styles)
class Limit extends React.Component {
    render() {
        const { limit } = this.props;
        const spendingTransactionsSum = this.getSpendingTransactionsSum();
        const progress = this.getProgress(spendingTransactionsSum);

        return (
            <div>
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
                <Typography>
                    Потрачено: { spendingTransactionsSum } / { limit.amount }
                </Typography>
                <LinearProgress
                    mode='determinate'
                    value={ progress }
                />
                <Divider />
            </div>
        );
    }

    getSpendingTransactionsSum() {
        const { limit: { categoriesIds }, transactions } = this.props;
        return transactions.reduce((acc, transaction) => {
            if (categoriesIds.includes(transaction.categoryId) && transaction.TransactionSum < 0) {
                acc -= transaction.TransactionSum;
            }

            return acc;
        }, 0);
    }

    getProgress(spendingTransactionsSum) {
        return (spendingTransactionsSum / this.props.limit.amount) * 100;
    }
}

export default Limit;
