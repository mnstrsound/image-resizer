import React from 'react';
import cn from 'arui-feather/cn';
import { SortableContainer } from 'react-sortable-hoc';

import SelectedImage from '../selected-image';

import './selected-images.css';

@cn('selected-images')
class SelectedImages extends React.Component {
    render(cn) {
        const { images } = this.props;
        return (
            <div className={ cn }>
                { images.map((image, index) => (
                    <SelectedImage
                        key={ image.name }
                        index={ index }
                        image={ image }
                    />
                )) }
            </div>
        );
    }
}

export default SortableContainer(SelectedImages);
