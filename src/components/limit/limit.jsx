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
        const { limit, card, spendingSum } = this.props;

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
                        secondary={ card.CardName }
                    />
                </ListItem>
                <Typography>
                    Потрачено: { spendingSum } / { limit.amount }
                </Typography>
                <LinearProgress
                    mode='determinate'
                    value={ (spendingSum / this.props.limit.amount) * 100 }
                />
                <Divider />
            </div>
        );
    }
}

export default Limit;
