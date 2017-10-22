import React from 'react';
import cn from 'arui-feather/cn';

import './select-watermark.css';

@cn('select-watermark')
export default class SelectWatermark extends React.Component {
    handleInputChange = () => {
        const { onChange } = this.props;
        const { files } = this.input;
        try {
            this.fileReader.readAsDataURL(files[0]);
        } catch (e) {
            this.setState({ imageSrc: null });
        }
        this.setState({ files });
        if (onChange) onChange(files);
    }

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            imageSrc: null
        };
        this.fileReader = new FileReader();
        this.fileReader.addEventListener('load', (e) => { this.setState({ imageSrc: e.target.result }); });
    }

    render(cn) {
        return (
            <label className={ cn }>
                { this.state.files.length ? (
                    <img src={ this.state.imageSrc } alt='' />
                ) : (
                    <span>Click Here</span>
                ) }
                <input
                    ref={ (input) => { this.input = input; } }
                    type='file'
                    accept='images/*'
                    onChange={ this.handleInputChange }
                />
            </label>
        );
    }
}
