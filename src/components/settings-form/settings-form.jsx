import React from 'react';
import SettingsModel from '../../models/settings';

export default class SettingsForm extends React.Component {
    handleWidthChange = (e) => {
        const { settings } = this;
        const { target: { value } } = e;

        settings.setWidth(value);
    }

    handleHeightChange = (e) => {
        const { settings } = this;
        const { target: { value } } = e;

        settings.setHeight(value);
    }

    handleFormSubmit = (e) => {
        e.preventDefault();

        const { onSubmit } = this.props;

        if (onSubmit) onSubmit(this.settings);
    }

    constructor(props) {
        super(props);
        this.settings = new SettingsModel();
    }

    render() {
        return (
            <form>
                <label>Ширина</label>
                <input
                    type='text'
                    placeholder='Ширина'
                    onChange={ this.handleWidthChange }
                />
                <label>Высота</label>
                <input
                    type='text'
                    placeholder='Высота'
                    onChange={ this.handleHeightChange }
                />
                <button
                    onClick={ this.handleFormSubmit }
                >
                    Применить
                </button>
            </form>
        );
    }
}
