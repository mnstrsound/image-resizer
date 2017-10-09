import React from 'react';

import SettingsForm from '../../components/settings-form';
import InputFile from '../../components/input-file';

class Main extends React.Component {
    state = {
        files: null
    }

    handleInputFileChange = (files) => {
        this.setState({ files });
    }

    handleSettingsFormSubmit = (values) => {
        const { files } = this.state;
        const formData = new FormData();

        formData.append('settings', JSON.stringify(values));

        Array.prototype.forEach.call(files, (file, index) => {
            formData.append(`file${index}`, file);
        });

        fetch('/api/images', {
            method: 'POST',
            body: formData
        });
    }

    render() {
        return (
            <div>
                <InputFile
                    id='upload-images'
                    onChange={ this.handleInputFileChange }
                />
                <SettingsForm
                    onSubmit={ this.handleSettingsFormSubmit }
                />
            </div>
        );
    }
}

export default Main;
