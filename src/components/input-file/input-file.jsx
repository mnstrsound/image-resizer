import React from 'react';

export default class InputFile extends React.Component {
    handleInputChange = () => {
        const { onChange } = this.props;
        if (onChange) onChange(this.input.files);
    }

    render() {
        const { id } = this.props;

        return (
            <div>
                <input
                    ref={ (input) => { this.input = input; } }
                    id={ id }
                    type='file'
                    multiple={ true }
                    onChange={ this.handleInputChange }
                />
                <label htmlFor={ id }>Выберите файл</label>
            </div>
        );
    }
}
