import React from 'react';
import { observer, inject } from 'mobx-react';
import cn from 'arui-feather/cn';

import SelectWatermark from '../../components/select-watermark';
import ImageFormats from '../../constants/image-formats';
import WatermarkPositions from '../../constants/watermark-positions';

import './settings-form.css';

@inject(({ appStore }) => ({
    appStore
}))
@observer
@cn('settings-form')
export default class SettingsForm extends React.Component {
    handleResizeWidthChange = (e) => {
        const { appStore: { settings } } = this.props;
        const { target: { value } } = e;

        settings.setResizeWidth(value);
    }

    handleResizeHeightChange = (e) => {
        const { appStore: { settings } } = this.props;
        const { target: { value } } = e;

        settings.setResizeHeight(value);
    }

    handleResizeCropChange = (e) => {
        const { appStore: { settings } } = this.props;
        const { target: { checked } } = e;

        settings.setResizeCrop(checked);
    }

    handleWatermarkImageChange = (files) => {
        const { appStore: { settings } } = this.props;

        settings.setWatermarkImage(files[0] || null);
    }

    handleWatermarkOpacityChange = (e) => {
        const { appStore: { settings } } = this.props;
        const { target: { value } } = e;

        settings.setWatermarkOpacity(value);
    }

    handleWatermarkSizeChange = (e) => {
        const { appStore: { settings } } = this.props;
        const { target: { value } } = e;

        settings.setWatermarkSize(value);
    }

    handleWatermarkPositionXChange = (e) => {
        const { appStore: { settings } } = this.props;
        const { target: { value } } = e;

        settings.setWatermarkPositionX(value);
    }

    handleWatermarkPositionYChange = (e) => {
        const { appStore: { settings } } = this.props;
        const { target: { value } } = e;

        settings.setWatermarkPositionY(value);
    }

    handleNamingPrefixChange = (e) => {
        const { appStore: { settings } } = this.props;
        const { target: { value } } = e;

        settings.setNamingPrefix(value);
    }

    handleNamingIndexationChange = (e) => {
        const { appStore: { settings } } = this.props;
        const { target: { value } } = e;

        settings.setNamingIndexation(value);
    }

    handleNamingFormat = (e) => {
        const { appStore: { settings } } = this.props;
        const { target: { value } } = e;

        settings.setNamingFormat(value);
    }

    handleInputFocus = (e) => {
        e.target.select();
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.props.appStore.process();
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
        const { appStore: { settings } } = this.props;
        return (
            <div className={ cn('row') }>
                <label className={ cn('row-label') }>Ширина (px)</label>
                <input
                    type='number'
                    min='1'
                    required={ true }
                    value={ settings.resize.width }
                    className={ cn('row-input') }
                    onFocus={ this.handleInputFocus }
                    onChange={ this.handleResizeWidthChange }
                />
            </div>
        );
    }

    renderResizeHeightControl(cn) {
        const { appStore: { settings } } = this.props;
        return (
            <div className={ cn('row') }>
                <label className={ cn('row-label') }>Высота (px)</label>
                <input
                    type='number'
                    min='1'
                    required={ true }
                    value={ settings.resize.height }
                    className={ cn('row-input') }
                    onFocus={ this.handleInputFocus }
                    onChange={ this.handleResizeHeightChange }
                />
            </div>
        );
    }

    renderResizeCropControl(cn) {
        const { appStore: { settings } } = this.props;
        return (
            <div className={ cn('row') }>
                <label className={ cn('row-label') } />
                <input
                    type='checkbox'
                    checked={ settings.resize.crop }
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
        const { appStore: { settings } } = this.props;
        const hidden = !settings.watermark.image;
        return (
            <div className={ cn('row', { hidden }) }>
                <label className={ cn('row-label') }>Прозрачность (%)</label>
                <input
                    type='number'
                    min='0'
                    max='100'
                    value={ settings.watermark.opacity }
                    className={ cn('row-input') }
                    onFocus={ this.handleInputFocus }
                    onChange={ this.handleWatermarkOpacityChange }
                />
            </div>
        );
    }

    renderWatermarkSizeControl(cn) {
        const { appStore: { settings } } = this.props;
        const hidden = !settings.watermark.image;
        return (
            <div className={ cn('row', { hidden }) }>
                <label className={ cn('row-label') }>Размер (%)</label>
                <input
                    type='number'
                    min='0'
                    max='100'
                    value={ settings.watermark.size }
                    className={ cn('row-input') }
                    onFocus={ this.handleInputFocus }
                    onChange={ this.handleWatermarkSizeChange }
                />
            </div>
        );
    }

    renderWatermarkPositionXControl(cn) {
        const { appStore: { settings } } = this.props;
        const hidden = !settings.watermark.image;
        return (
            <div className={ cn('row', { hidden }) }>
                <label className={ cn('row-label') }>Положение (ось X)</label>
                <select
                    value={ settings.watermark.positionX }
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
        const { appStore: { settings } } = this.props;
        const hidden = !settings.watermark.image;
        return (
            <div className={ cn('row', { hidden }) }>
                <label className={ cn('row-label') }>Положение (ось Y)</label>
                <select
                    value={ settings.watermark.positionY }
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
        const { appStore: { settings } } = this.props;
        return (
            <div className={ cn('row') }>
                <label className={ cn('row-label') }>Префикс</label>
                <input
                    type='text'
                    name='prefix'
                    pattern='[\w-]*'
                    maxLength='20'
                    value={ settings.naming.prefix }
                    className={ cn('row-input') }
                    onFocus={ this.handleInputFocus }
                    onChange={ this.handleNamingPrefixChange }
                />
            </div>
        );
    }

    renderNamingIndexationControl(cn) {
        const { appStore: { settings } } = this.props;
        return (
            <div className={ cn('row') }>
                <label className={ cn('row-label') }>Индексация c</label>
                <input
                    type='number'
                    min='0'
                    value={ settings.naming.indexation }
                    className={ cn('row-input') }
                    onFocus={ this.handleInputFocus }
                    onChange={ this.handleNamingIndexationChange }
                />
            </div>
        );
    }

    renderNamingFormatControl(cn) {
        const { appStore: { settings } } = this.props;
        return (
            <div className={ cn('row') }>
                <label className={ cn('row-label') }>Формат</label>
                <select
                    value={ settings.naming.format }
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
