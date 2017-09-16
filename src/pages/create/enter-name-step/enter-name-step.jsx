import React from 'react';
import { observer, inject } from 'mobx-react';

import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

import styles from './styles';

@withStyles(styles)
@inject(({ createStore }) => ({ createStore }))
@observer
class Main extends React.Component {

    render() {
        return (
            <TextField
                id='placeholder'
                label='Введите название'
                helperText='Название вашего лимита'
                fullWidth={ true }
                value={ this.props.limit.name }
                onChange={ this.handleNameChange }
            />
        );
    }

    handleNameChange = (e) => {
        this.props.limit.setName(e.target.value);
    }
}

export default Main;
