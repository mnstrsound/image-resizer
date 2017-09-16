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
                { cards.map(card => (
                    <Button
                        key={ card.CardId }
                        raised={ true }
                        color={ cardId === card.CardId ? 'accent' : 'primary' }
                        className={ this.props.classes.button }
                        onClick={ () => { this.handleButtonClick(card.CardId); } }
                    >
                        { card.CardName }
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
