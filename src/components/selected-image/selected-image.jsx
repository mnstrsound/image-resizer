import React from 'react';
import cn from 'arui-feather/cn';

import './selected-image.css';

@cn('selected-image')
export default class SelectedImage extends React.Component {
    state = {
        imageSrc: null
    }

    componentDidMount() {
        const { file } = this.props;
        const fileReader = new FileReader();

        fileReader.addEventListener('load', (e) => { this.setState({ imageSrc: e.target.result }); });
        fileReader.readAsDataURL(file);
    }

    render(cn) {
        const { file } = this.props;
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
                    title={ file.name }
                    className={ cn('name') }
                >
                    { file.name }
                </div>
            </div>
        );
    }
}