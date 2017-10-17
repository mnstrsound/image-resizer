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

    handleResizeCropChange = (e) => {
        const { settings } = this;
        const { target: { checked } } = e;

        settings.setResizeCrop(checked);
    }

    handleWatermarkImageChange = (files) => {
        const { settings } = this;

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
                { this.renderResizeWidthControl(cn) }
                { this.renderResizeHeightControl(cn) }
                { this.renderResizeCropControl(cn) }
                { this.renderWatermarkImageControl(cn) }
                { this.renderWatermarkOpacityControl(cn) }
                { this.renderWatermarkSizeControl(cn) }
                { this.renderWatermarkPositionXControl(cn) }
                { this.renderWatermarkPositionYControl(cn) }
                { this.renderNamingPrefixControl(cn) }
                { this.renderNamingIndexationControl(cn) }
                { this.renderNamingFormatControl(cn) }
                { this.renderSubmitControl(cn) }
            </form>
        );
    }

    renderResizeWidthControl(cn) {
        return (
            <fieldset className={ cn('fieldset') }>
                <label className={ cn('fieldset-label') }>Ширина (px)</label>
                <input
                    type='number'
                    value={ this.settings.resize.width }
                    className={ cn('fieldset-input') }
                    onFocus={ this.handleInputFocus }
                    onChange={ this.handleResizeWidthChange }
                />
            </fieldset>
        );
    }

    renderResizeHeightControl(cn) {
        return (
            <fieldset className={ cn('fieldset') }>
                <label className={ cn('fieldset-label') }>Высота (px)</label>
                <input
                    type='number'
                    value={ this.settings.resize.height }
                    className={ cn('fieldset-input') }
                    onFocus={ this.handleInputFocus }
                    onChange={ this.handleResizeHeightChange }
                />
            </fieldset>
        );
    }

    renderResizeCropControl(cn) {
        return (
            <fieldset className={ cn('fieldset') }>
                <label className={ cn('fieldset-label') }>Обрезать</label>
                <input
                    type='checkbox'
                    checked={ this.settings.resize.crop }
                    className={ cn('fieldset-checkbox') }
                    onChange={ this.handleResizeCropChange }
                />
            </fieldset>
        );
    }

    renderWatermarkImageControl(cn) {
        return (
            <fieldset className={ cn('fieldset') }>
                <label className={ cn('fieldset-label') }>Ватермарка</label>
                <SelectWatermark
                    className={ cn('fieldset-watermark') }
                    onChange={ this.handleWatermarkImageChange }
                />
            </fieldset>
        );
    }

    renderWatermarkOpacityControl(cn) {
        const hidden = !this.settings.watermark.image;
        return (
            <fieldset className={ cn('fieldset', { hidden }) }>
                <label className={ cn('fieldset-label') }>Прозрачность (%)</label>
                <input
                    type='number'
                    value={ this.settings.watermark.opacity }
                    className={ cn('fieldset-input') }
                    onFocus={ this.handleInputFocus }
                    onChange={ this.handleWatermarkOpacityChange }
                />
            </fieldset>
        );
    }

    renderWatermarkSizeControl(cn) {
        const hidden = !this.settings.watermark.image;
        return (
            <fieldset className={ cn('fieldset', { hidden }) }>
                <label className={ cn('fieldset-label') }>Размер (%)</label>
                <input
                    type='number'
                    value={ this.settings.watermark.size }
                    className={ cn('fieldset-input') }
                    onFocus={ this.handleInputFocus }
                    onChange={ this.handleWatermarkSizeChange }
                />
            </fieldset>
        );
    }

    renderWatermarkPositionXControl(cn) {
        const hidden = !this.settings.watermark.image;
        return (
            <fieldset className={ cn('fieldset', { hidden }) }>
                <label className={ cn('fieldset-label') }>Положение (ось X)</label>
                <select
                    value={ this.settings.watermark.positionX }
                    className={ cn('fieldset-select') }
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
        );
    }

    renderWatermarkPositionYControl(cn) {
        const hidden = !this.settings.watermark.image;
        return (
            <fieldset className={ cn('fieldset', { hidden }) }>
                <label className={ cn('fieldset-label') }>Положение (ось Y)</label>
                <select
                    value={ this.settings.watermark.positionY }
                    className={ cn('fieldset-select') }
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
        );
    }

    renderNamingPrefixControl(cn) {
        return (
            <fieldset className={ cn('fieldset') }>
                <label className={ cn('fieldset-label') }>Префикс</label>
                <input
                    type='text'
                    name='prefix'
                    value={ this.settings.naming.prefix }
                    className={ cn('fieldset-input') }
                    onFocus={ this.handleInputFocus }
                    onChange={ this.handleNamingPrefixChange }
                />
            </fieldset>
        );
    }

    renderNamingIndexationControl(cn) {
        return (
            <fieldset className={ cn('fieldset') }>
                <label className={ cn('fieldset-label') }>Индексация c</label>
                <input
                    type='number'
                    value={ this.settings.naming.indexation }
                    className={ cn('fieldset-input') }
                    onFocus={ this.handleInputFocus }
                    onChange={ this.handleNamingIndexationChange }
                />
            </fieldset>
        );
    }

    renderNamingFormatControl(cn) {
        return (
            <fieldset className={ cn('fieldset') }>
                <label className={ cn('fieldset-label') }>Формат</label>
                <select
                    value={ this.settings.naming.format }
                    className={ cn('fieldset-select') }
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
        );
    }

    renderSubmitControl(cn) {
        return (
            <fieldset className={ cn('fieldset') }>
                <button
                    className={ cn('fieldset-button') }
                    onClick={ this.handleFormSubmit }
                >
                    Применить
                </button>
            </fieldset>
        );
    }
}
