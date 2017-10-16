import React from 'react';
import cn from 'arui-feather/cn';

import SelectImages from '../../components/select-images';
import SettingsForm from '../../components/settings-form';

import './main.css';

@cn('main')
class Main extends React.Component {
    state = {
        files: null
    }

    handleInputFileChange = (files) => {
        this.setState({ files });
    }

    handleSettingsFormSubmit = ({ watermark: { image: watermarkImage, ...watermark }, ...values }) => {
        const { files } = this.state;
        const formData = new FormData();

        formData.append('settings', JSON.stringify({ ...values, watermark }));

        Array.prototype.forEach.call(files, (file, index) => {
            formData.append(`file${index}`, file);
        });

        if (watermarkImage) formData.append('watermark', watermarkImage);

        fetch('/api/images', {
            method: 'POST',
            body: formData
        });
    }

    render(cn) {
        return (
            <div className={ cn }>
                <SettingsForm
                    className={ cn('settings-form') }
                    onSubmit={ this.handleSettingsFormSubmit }
                />
                <SelectImages
                    className={ cn('select-images') }
                    onChange={ this.handleInputFileChange }
                />
            </div>
        );
    }
}

export default Main;
