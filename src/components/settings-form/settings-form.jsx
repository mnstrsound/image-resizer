import React from 'react';
import { observer } from 'mobx-react';
import cn from 'arui-feather/cn';

import SettingsModel from '../../models/settings';
import ImageFormats from '../../constants/image-formats';

import './settings-form.css';

@cn('settings-form')
@observer
export default class SettingsForm extends React.Component {
    handleResizeWidthChange = (e) => {
        const { settings } = this;
        const { target: { value } } = e;

        settings.setResizeWidth(value);
    }

    handleResizeHeightChange = (e) => {
        const { settings } = this;
        const { target: { value } } = e;

        settings.setResizeHeight(value);
    }

    handleWatermarkImageChange = (e) => {
        const { settings } = this;
        const { target: { files } } = e;

        settings.setWatermarkImage(files[0] || null);
    }

    handleWatermarkOpacityChange = (e) => {
        const { settings } = this;
        const { target: { value } } = e;

        settings.setWatermarkOpacity(value);
    }

    handleNamingPrefixChange = (e) => {
        const { settings } = this;
        const { target: { value } } = e;

        settings.setNamingPrefix(value);
    }

    handleNamingIndexationChange = (e) => {
        const { settings } = this;
        const { target: { value } } = e;

        settings.setNamingIndexation(value);
    }


    handleNamingFormat = (e) => {
        const { settings } = this;
        const { target: { value } } = e;

        settings.setNamingFormat(value);
    }

    handleFormSubmit = (e) => {
        e.preventDefault();

        const { onSubmit } = this.props;

        if (onSubmit) onSubmit(this.settings.values);
    }

    constructor(props) {
        super(props);
        this.settings = new SettingsModel();
    }

    render(cn) {
        return (
            <form className={ cn }>
                <fieldset>
                    <label htmlFor='width'>Ширина (px)</label>
                    <input
                        id='width'
                        type='number'
                        value={ this.settings.resize.width }
                        onChange={ this.handleResizeWidthChange }
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor='height'>Высота (px)</label>
                    <input
                        id='height'
                        type='number'
                        value={ this.settings.resize.height }
                        onChange={ this.handleResizeHeightChange }
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor='watermark'>
                        Ватермарка
                    </label>
                    <input
                        id='watermark'
                        type='file'
                        onChange={ this.handleWatermarkImageChange }
                    />
                </fieldset>
                <fieldset style={ { display: this.settings.watermark.image ? 'block' : 'none' } }>
                    <label htmlFor='opacity'>Прозрачность (%)</label>
                    <input
                        id='opacity'
                        type='number'
                        value={ this.settings.watermark.opacity }
                        onChange={ this.handleWatermarkOpacityChange }
                    />
                </fieldset>
                <fieldset>
                    <label>
                        Префикс
                    </label>
                    <input
                        id='prefix'
                        type='text'
                        name='prefix'
                        value={ this.settings.naming.prefix }
                        onChange={ this.handleNamingPrefixChange }
                    />
                </fieldset>
                <fieldset>
                    <label>
                        Индексация c
                    </label>
                    <input
                        id='start_index'
                        type='number'
                        value={ this.settings.naming.indexation }
                        onChange={ this.handleNamingIndexationChange }
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor='format'>Формат</label>
                    <select
                        id='format'
                        value={ this.settings.naming.format }
                        onChange={ this.handleNamingFormat }
                    >
                        {
                            Object.keys(ImageFormats).map(key => (
                                <option
                                    key={ key }
                                    value={ ImageFormats[key].value }
                                >
                                    { ImageFormats[key].text }
                                </option>
                            ))
                        }
                    </select>
                </fieldset>
                <fieldset>
                    <button
                        onClick={ this.handleFormSubmit }
                    >
                        Применить
                    </button>
                </fieldset>
            </form>
        );
    }
}
