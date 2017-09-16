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
    handleAmountChange = (e) => {
        this.props.limit.setAmount(e.target.value);
    }

    handleCalcForWeekChange = () => {
        this.props.limit.toggleCalcForWeek();
    }

    handleCalcForDayChange = () => {
        this.props.limit.toggleCalcForDay();
    }

    render() {
        const { limit } = this.props;
        return (
            <div>
                <TextField
                    id='placeholder'
                    label='Введите сумму'
                    helperText='Сумма, которую вы планируете потратить'
                    fullWidth={ true }
                    value={ limit.amount }
                    onChange={ this.handleAmountChange }
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={ limit.calcForWeek }
                            onChange={ this.handleCalcForWeekChange }
                        />
                    }
                    label='рассчитать на неделю'
                />
                <Typography>
                    { limit.calcForWeek && limit.amountForWeek }
                </Typography>
                <FormControlLabel
                    control={
                        <Switch
                            checked={ limit.calcForDay }
                            onChange={ this.handleCalcForDayChange }
                        />
                    }
                    label='рассчитать на день'
                />
                <Typography>
                    { limit.calcForDay && limit.amountForDay }
                </Typography>
            </div>
        );
    }
}

export default Main;
