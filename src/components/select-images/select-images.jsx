import React from 'react';
import { observer, inject } from 'mobx-react';
import cn from 'arui-feather/cn';

import SelectedImages from '../../components/selected-images';

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
        appStore.setImages([].slice.call(files));
    }

    handleSortEnd = ({ oldIndex, newIndex }) => {
        const { appStore } = this.props;
        appStore.moveImages(oldIndex, newIndex);
    }

    render(cn) {
        const { images } = this.props.appStore;
        return (
            <div className={ cn }>
                { images.length
                    ? <SelectedImages
                        axis='x'
                        images={ images }
                        onSortEnd={ this.handleSortEnd }
                    />
                    : <label className={ cn('area') }>
                        <span className={ cn('area-label') }>Click Here</span>
                        <input
                            ref={ (input) => { this.input = input; } }
                            type='file'
                            multiple={ true }
                            className={ cn('area-input') }
                            onChange={ this.handleInputChange }
                        />
                    </label>
                }
            </div>
        );
    }
}
