import React from 'react';
import cn from 'arui-feather/cn';

import SelectedImage from '../../components/selected-image';

import './select-images.css';

@cn('select-images')
export default class SelectImages extends React.Component {
    state = {
        files: []
    }

    handleInputChange = () => {
        const { onChange } = this.props;
        const { files } = this.input;
        this.setState({ files });
        if (onChange) onChange(this.input.files);
    }

    render(cn) {
        const { files } = this.state;
        return (
            <label className={ cn }>
                { files.length ? (
                    <div className={ cn('files') }>
                        { Array.prototype.map.call(files, file => (
                            <SelectedImage
                                key={ file.name }
                                file={ file }
                            />
                        )) }
                    </div>
                ) : (
                    <span className={ cn('label') }>Click Here</span>
                ) }
                <input
                    ref={ (input) => { this.input = input; } }
                    type='file'
                    multiple={ true }
                    className={ cn('input') }
                    onChange={ this.handleInputChange }
                />
            </label>
        );
    }
}
