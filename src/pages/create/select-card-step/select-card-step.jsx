import React from 'react';
import { observer, inject } from 'mobx-react';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import styles from './styles';

@withStyles(styles)
@inject(({ cardsStore }) => ({ cardsStore }))
@observer
class SelectCardStep extends React.Component {
    render() {
        const { limit: { cardId }, cardsStore: { cards } } = this.props;
        return (
            <div>
                <Typography className={ this.props.classes.text }>
                    Выберите карту
                </Typography>
                { Object.keys(cards).map(key => (
                    <Button
                        key={ cards[key].CardId }
                        raised={ true }
                        color={ cardId === cards[key].CardId ? 'accent' : 'primary' }
                        className={ this.props.classes.button }
                        onClick={ () => { this.handleButtonClick(cards[key].CardId); } }
                    >
                        { cards[key].CardName }
                    </Button>
                )) }
            </div>
        );
    }

    handleButtonClick(cardId) {
        this.props.limit.setCardId(cardId);
    }
}

export default SelectCardStep;
