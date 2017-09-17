import React from 'react';

import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { LinearProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';

import { getTransactionsByPeriod, getTransactionsTotalSum } from '../../utils/helpers';
import styles from './styles';

@withStyles(styles)
class Limit extends React.Component {
    handleClick = () => {
        const { limit, onClick } = this.props;
        if (onClick) onClick(limit._id);
    }

    render() {
        const { limit, card, transactions, period, classes } = this.props;
        let amount;
        if (period === 'month') amount = limit.amount;
        if (period === 'week') amount = limit.amountForWeek;
        if (period === 'day') amount = limit.amountForDay;

        const spendingSum = getTransactionsTotalSum(
            getTransactionsByPeriod(transactions[limit.cardId].filter(
                transaction => limit.categoriesIds.includes(transaction.categoryId)
            ), period)
        );

        return (
            <div>
                <ListItem
                    dense={ true }
                    button={ true }
                    onClick={ this.handleClick }
                >
                    <Avatar className={ classes.limitAvatar }>{ limit.name[0].toUpperCase() }</Avatar>
                    <ListItemText
                        primary={ limit.name }
                        secondary={ card.CardName }
                    />
                </ListItem>
                <Typography>
                    Потрачено: { spendingSum } / { amount } ₽
                </Typography>
                <LinearProgress
                    mode='determinate'
                    value={ (spendingSum / amount) * 100 }
                    className={ classes.limitProgress }
                />
                <Divider />
            </div>
        );
    }
}

export default Limit;
