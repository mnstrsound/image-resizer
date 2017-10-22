import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { observer, inject } from 'mobx-react';
import cn from 'arui-feather/cn';

import './selected-image.css';

@inject(({ appStore }) => ({
    appStore
}))
@observer
@cn('selected-image')
class SelectedImage extends React.Component {
    state = {
        imageSrc: null
    }

    handleDeleteButtonClick = () => {
        this.props.appStore.deleteImage(this.props.image);
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
                    <span
                        className={ cn('delete') }
                        onClick={ this.handleDeleteButtonClick }
                    >
                        &#9746;
                    </span>
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
