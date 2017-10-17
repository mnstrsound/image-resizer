import React from 'react';
import { observer, inject } from 'mobx-react';
import cn from 'arui-feather/cn';

import SelectedImage from '../../components/selected-image';

import './select-images.css';

@inject(({ appStore }) => ({
    appStore
}))
@observer
@cn('select-images')
export default class SelectImages extends React.Component {
    handleInputChange = () => {
        const { appStore } = this.props;
        const { files } = this.input;
        appStore.setImages(files);
    }

    render(cn) {
        const { images } = this.props.appStore;
        return (
            <label className={ cn }>
                { images.length ? (
                    <div className={ cn('images') }>
                        { Array.prototype.map.call(images, image => (
                            <SelectedImage
                                key={ image.name }
                                file={ image }
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
