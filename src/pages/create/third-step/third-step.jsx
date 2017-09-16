import React from 'react';
import { observer, inject } from 'mobx-react';

import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Switch from 'material-ui/Switch';
import Typography from 'material-ui/Typography';
import { FormControlLabel } from 'material-ui/Form';

import styles from './styles';

@withStyles(styles)
@inject(({ createStore }) => ({
    createStore
}))
@observer
class Main extends React.Component {
    render() {
        return (
            <div>
                <TextField
                    id='placeholder'
                    label='Введите сумму'
                    helperText='Сумма, которую вы планируете потратить'
                    fullWidth={ true }
                    onChange={ this.handleAmountChange }
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={ this.props.createStore.calcForWeek }
                            onChange={ this.handleCalcForWeekChange }
                        />
                    }
                    label='рассчитать на неделю'
                />
                <Typography>
                    { this.props.createStore.calcForWeek && this.props.createStore.amountForWeek }
                </Typography>
                <FormControlLabel
                    control={
                        <Switch
                            checked={ this.props.createStore.calcForDay }
                            onChange={ this.handleCalcForDayChange }
                        />
                    }
                    label='рассчитать на день'
                />
                <Typography>
                    { this.props.createStore.calcForDay && this.props.createStore.amountForDay }
                </Typography>
            </div>
        );
    }

    handleAmountChange = (e) => {
        this.props.createStore.setAmount(e.target.value);
    }

    handleCalcForWeekChange = () => {
        this.props.createStore.toggleCalcForWeek();
    }

    handleCalcForDayChange = () => {
        this.props.createStore.toggleCalcForDay();
    }
}

export default Main;
