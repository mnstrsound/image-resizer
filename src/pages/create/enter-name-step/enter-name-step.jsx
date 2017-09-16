import React from 'react';

import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

import styles from './styles';

@withStyles(styles)
class Main extends React.Component {
    handleNameChange = (e) => {
        this.props.limit.setName(e.target.value);
    }

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
}

export default Main;
