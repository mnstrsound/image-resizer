import React from 'react';
import { observer, inject } from 'mobx-react';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import styles from './styles';

@withStyles(styles)
@inject(({ createStore, cardsStore }) => ({
    createStore,
    cardsStore
}))
@observer
class SelectCardStep extends React.Component {
    render() {
        return (
            <div>
                <Typography>
                    Выберите карту
                </Typography>
                { this.props.cardsStore.cards.map(card => (
                    <Typography key={ card.CardId }>
                        <Button
                            raised={ true }
                            color={ this.props.createStore.cardId === card.CardId ? 'accent' : 'primary' }
                            style={ { width: '100%' } }
                            onClick={ () => { this.handleButtonClick(card.CardId); } }
                        >
                            { card.CardName }
                        </Button>
                    </Typography>
                )) }
            </div>
        );
    }

    handleButtonClick(cardId) {
        this.props.createStore.setCardId(cardId);
    }
}

export default SelectCardStep;
