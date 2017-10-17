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
            <form
                className={ cn }
                onSubmit={ this.handleFormSubmit }
            >
                { this.renderResizeControls(cn) }
                { this.renderWatermarkControls(cn) }
                { this.renderNamingControls(cn) }
                { this.renderSubmitControl(cn) }
            </form>
        );
    }

    renderResizeWidthControl(cn) {
        return (
            <div className={ cn('row') }>
                <label className={ cn('row-label') }>Ширина (px)</label>
                <input
                    type='number'
                    min='0'
                    required={ true }
                    value={ this.settings.resize.width }
                    className={ cn('row-input') }
                    onFocus={ this.handleInputFocus }
                    onChange={ this.handleResizeWidthChange }
                />
            </div>
        );
    }

    renderResizeHeightControl(cn) {
        return (
            <div className={ cn('row') }>
                <label className={ cn('row-label') }>Высота (px)</label>
                <input
                    type='number'
                    min='0'
                    required={ true }
                    value={ this.settings.resize.height }
                    className={ cn('row-input') }
                    onFocus={ this.handleInputFocus }
                    onChange={ this.handleResizeHeightChange }
                />
            </div>
        );
    }

    renderResizeCropControl(cn) {
        return (
            <div className={ cn('row') }>
                <label className={ cn('row-label') } />
                <input
                    type='checkbox'
                    checked={ this.settings.resize.crop }
                    className={ cn('row-checkbox') }
                    onChange={ this.handleResizeCropChange }
                />
                <label className={ cn('row-checkbox-text') }>
                    Обрезать
                </label>
            </div>
        );
    }

    renderResizeControls(cn) {
        return (
            <fieldset className={ cn('fieldset') }>
                <legend className={ cn('legend') }>Размеры</legend>
                { this.renderResizeWidthControl(cn) }
                { this.renderResizeHeightControl(cn) }
                { this.renderResizeCropControl(cn) }
            </fieldset>
        );
    }

    renderWatermarkImageControl(cn) {
        return (
            <div className={ cn('row') }>
                <label className={ cn('row-label') }>Изображение</label>
                <SelectWatermark
                    className={ cn('row-watermark') }
                    onChange={ this.handleWatermarkImageChange }
                />
            </div>
        );
    }

    renderWatermarkOpacityControl(cn) {
        const hidden = !this.settings.watermark.image;
        return (
            <div className={ cn('row', { hidden }) }>
                <label className={ cn('row-label') }>Прозрачность (%)</label>
                <input
                    type='number'
                    min='0'
                    max='100'
                    value={ this.settings.watermark.opacity }
                    className={ cn('row-input') }
                    onFocus={ this.handleInputFocus }
                    onChange={ this.handleWatermarkOpacityChange }
                />
            </div>
        );
    }

    renderWatermarkSizeControl(cn) {
        const hidden = !this.settings.watermark.image;
        return (
            <div className={ cn('row', { hidden }) }>
                <label className={ cn('row-label') }>Размер (%)</label>
                <input
                    type='number'
                    min='0'
                    max='100'
                    value={ this.settings.watermark.size }
                    className={ cn('row-input') }
                    onFocus={ this.handleInputFocus }
                    onChange={ this.handleWatermarkSizeChange }
                />
            </div>
        );
    }

    renderWatermarkPositionXControl(cn) {
        const hidden = !this.settings.watermark.image;
        return (
            <div className={ cn('row', { hidden }) }>
                <label className={ cn('row-label') }>Положение (ось X)</label>
                <select
                    value={ this.settings.watermark.positionX }
                    className={ cn('row-select') }
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
            </div>
        );
    }

    renderWatermarkPositionYControl(cn) {
        const hidden = !this.settings.watermark.image;
        return (
            <div className={ cn('row', { hidden }) }>
                <label className={ cn('row-label') }>Положение (ось Y)</label>
                <select
                    value={ this.settings.watermark.positionY }
                    className={ cn('row-select') }
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
            </div>
        );
    }

    renderWatermarkControls(cn) {
        return (
            <fieldset className={ cn('fieldset') }>
                <legend className={ cn('legend') }>Водяной знак</legend>
                { this.renderWatermarkImageControl(cn) }
                { this.renderWatermarkOpacityControl(cn) }
                { this.renderWatermarkSizeControl(cn) }
                { this.renderWatermarkPositionXControl(cn) }
                { this.renderWatermarkPositionYControl(cn) }
            </fieldset>
        );
    }

    renderNamingPrefixControl(cn) {
        return (
            <div className={ cn('row') }>
                <label className={ cn('row-label') }>Префикс</label>
                <input
                    type='text'
                    name='prefix'
                    pattern='[\w-]*'
                    maxLength='20'
                    value={ this.settings.naming.prefix }
                    className={ cn('row-input') }
                    onFocus={ this.handleInputFocus }
                    onChange={ this.handleNamingPrefixChange }
                />
            </div>
        );
    }

    renderNamingIndexationControl(cn) {
        return (
            <div className={ cn('row') }>
                <label className={ cn('row-label') }>Индексация c</label>
                <input
                    type='number'
                    min='0'
                    value={ this.settings.naming.indexation }
                    className={ cn('row-input') }
                    onFocus={ this.handleInputFocus }
                    onChange={ this.handleNamingIndexationChange }
                />
            </div>
        );
    }

    renderNamingFormatControl(cn) {
        return (
            <div className={ cn('row') }>
                <label className={ cn('row-label') }>Формат</label>
                <select
                    value={ this.settings.naming.format }
                    className={ cn('row-select') }
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
            </div>
        );
    }

    renderNamingControls(cn) {
        return (
            <fieldset className={ cn('fieldset') }>
                <legend className={ cn('legend') }>Именование</legend>
                { this.renderNamingPrefixControl(cn) }
                { this.renderNamingIndexationControl(cn) }
                { this.renderNamingFormatControl(cn) }
            </fieldset>
        );
    }

    renderSubmitControl(cn) {
        return (
            <div className={ cn('row') }>
                <button
                    className={ cn('row-button') }
                >
                    Применить
                </button>
            </div>
        );
    }
}
