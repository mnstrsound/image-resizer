import React from 'react';
import cn from 'arui-feather/cn';
import { SortableElement } from 'react-sortable-hoc';

import './selected-image.css';

@cn('selected-image')
class SelectedImage extends React.Component {
    state = {
        imageSrc: null
    }

    componentDidMount() {
        const { image } = this.props;
        const fileReader = new FileReader();
        fileReader.addEventListener('load', (e) => { this.setState({ imageSrc: e.target.result }); });
        fileReader.readAsDataURL(image);
    }

    render(cn) {
        const { image } = this.props;
        const { imageSrc } = this.state;
        return (
            <div className={ cn }>
                <div className={ cn('wrapper') }>
                    <img
                        src={ imageSrc }
                        alt=''
                        className={ cn('image') }
                    />
                </div>
                <div
                    title={ image.name }
                    className={ cn('name') }
                >
                    { image.name }
                </div>
            </div>
        );
    }
}

export default SortableElement(SelectedImage);
