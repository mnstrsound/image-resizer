import React from 'react';
import { observer } from 'mobx-react';
import cn from 'arui-feather/cn';

import SelectWatermark from '../../components/select-watermark';
import SettingsModel from '../../models/settings';
import ImageFormats from '../../constants/image-formats';
import WatermarkPositions from '../../constants/watermark-positions';

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

    handleWatermarkSizeChange = (e) => {
        const { settings } = this;
        const { target: { value } } = e;

        settings.setWatermarkSize(value);
    }

    handleWatermarkPositionXChange = (e) => {
        const { settings } = this;
        const { target: { value } } = e;

        settings.setWatermarkPositionX(value);
    }

    handleWatermarkPositionYChange = (e) => {
        const { settings } = this;
        const { target: { value } } = e;

        settings.setWatermarkPositionY(value);
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

    handleInputFocus = (e) => {
        e.target.select();
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
                    <label>Ширина (px)</label>
                    <input
                        type='number'
                        value={ this.settings.resize.width }
                        onFocus={ this.handleInputFocus }
                        onChange={ this.handleResizeWidthChange }
                    />
                </fieldset>
                <fieldset>
                    <label>Высота (px)</label>
                    <input
                        type='number'
                        value={ this.settings.resize.height }
                        onFocus={ this.handleInputFocus }
                        onChange={ this.handleResizeHeightChange }
                    />
                </fieldset>
                <fieldset>
                    <label>
                        Ватермарка
                    </label>
                    <SelectWatermark />
                    <input
                        type='file'
                        onChange={ this.handleWatermarkImageChange }
                    />
                </fieldset>
                <fieldset style={ { display: this.settings.watermark.image ? 'block' : 'none' } }>
                    <label>Прозрачность (%)</label>
                    <input
                        type='number'
                        value={ this.settings.watermark.opacity }
                        onFocus={ this.handleInputFocus }
                        onChange={ this.handleWatermarkOpacityChange }
                    />
                </fieldset>
                <fieldset style={ { display: this.settings.watermark.image ? 'block' : 'none' } }>
                    <label>Размер (%)</label>
                    <input
                        type='number'
                        value={ this.settings.watermark.size }
                        onFocus={ this.handleInputFocus }
                        onChange={ this.handleWatermarkSizeChange }
                    />
                </fieldset>
                <fieldset style={ { display: this.settings.watermark.image ? 'block' : 'none' } }>
                    <label>Положение (ось X)</label>
                    <select
                        value={ this.settings.watermark.positionX }
                        onChange={ this.handleWatermarkPositionXChange }
                    >
                        {
                            Object.keys(WatermarkPositions.horizontal).map(key => (
                                <option
                                    key={ key }
                                    value={ WatermarkPositions.horizontal[key].value }
                                >
                                    { WatermarkPositions.horizontal[key].text }
                                </option>
                            ))
                        }
                    </select>
                </fieldset>
                <fieldset style={ { display: this.settings.watermark.image ? 'block' : 'none' } }>
                    <label>Положение (ось Y)</label>
                    <select
                        value={ this.settings.watermark.positionY }
                        onChange={ this.handleWatermarkPositionYChange }
                    >
                        {
                            Object.keys(WatermarkPositions.vertical).map(key => (
                                <option
                                    key={ key }
                                    value={ WatermarkPositions.vertical[key].value }
                                >
                                    { WatermarkPositions.vertical[key].text }
                                </option>
                            ))
                        }
                    </select>
                </fieldset>
                <fieldset>
                    <label>
                        Префикс
                    </label>
                    <input
                        type='text'
                        name='prefix'
                        onFocus={ this.handleInputFocus }
                        value={ this.settings.naming.prefix }
                        onChange={ this.handleNamingPrefixChange }
                    />
                </fieldset>
                <fieldset>
                    <label>
                        Индексация c
                    </label>
                    <input
                        type='number'
                        onFocus={ this.handleInputFocus }
                        value={ this.settings.naming.indexation }
                        onChange={ this.handleNamingIndexationChange }
                    />
                </fieldset>
                <fieldset>
                    <label>Формат</label>
                    <select
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
