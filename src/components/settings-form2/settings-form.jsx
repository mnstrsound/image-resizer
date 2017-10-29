import React from 'react';
import { observer, inject } from 'mobx-react';
import cn from 'arui-feather/cn';

import SelectWatermark from '../../components/select-watermark';
import ImageFormats from '../../constants/image-formats';
import WatermarkPositions from '../../constants/watermark-positions';
import Rules from '../../validation/rules';

@inject(({ settingsForm }) => ({ settingsForm }))
@observer
@cn('settings-form')
export default class SettingsForm extends React.Component {
    render(cn) {
        const { settingsForm } = this.props;
        return (
            <form
                className={ cn }
                onSubmit={ settingsForm.onSubmit }
            >
                { this.renderResizeControls(cn) }
                { this.renderPreviewControls(cn) }
                { this.renderWatermarkControls(cn) }
                { this.renderNamingControls(cn) }
                { this.renderSubmitControl(cn) }
            </form>
        );
    }

    renderResizeWidthControl(cn) {
        const { settingsForm } = this.props;
        const width = settingsForm.$('resize.width');
        return (
            <div className={ cn('row') }>
                <label className={ cn('row-label') }>{ width.label }</label>
                <input
                    className={ cn('row-input') }
                    { ...width.bind() }
                />
            </div>
        );
    }

    renderResizeHeightControl(cn) {
        const { settingsForm } = this.props;
        const height = settingsForm.$('resize.height');
        return (
            <div className={ cn('row') }>
                <label className={ cn('row-label') }>{ height.label }</label>
                <input
                    className={ cn('row-input') }
                    { ...height.bind() }
                />
            </div>
        );
    }

    renderResizeCropControl(cn) {
        const { settingsForm } = this.props;
        const crop = settingsForm.$('resize.crop');
        return (
            <div className={ cn('row') }>
                <label className={ cn('row-label') } />
                <input
                    className={ cn('row-checkbox') }
                    { ...crop.bind() }
                />
                <label className={ cn('row-checkbox-text') }>
                    { crop.label }
                </label>
            </div>
        );
    }

    renderResizeControls(cn) {
        const { settingsForm } = this.props;
        const resize = settingsForm.$('resize');
        return (
            <fieldset className={ cn('fieldset') }>
                <legend className={ cn('legend') }>{ resize.label }</legend>
                { this.renderResizeWidthControl(cn) }
                { this.renderResizeHeightControl(cn) }
                { this.renderResizeCropControl(cn) }
            </fieldset>
        );
    }

    renderPreviewWidthControl(cn) {
        const { settingsForm } = this.props;
        const width = settingsForm.$('preview.width');
        const use = settingsForm.$('preview.use');
        return (
            <div className={ cn('row') }>
                <label className={ cn('row-label') }>{ width.label }</label>
                <input
                    className={ cn('row-input') }
                    { ...width.bind() }
                />
            </div>
        );
    }

    renderPreviewHeightControl(cn) {
        const { settingsForm } = this.props;
        const height = settingsForm.$('preview.height');
        const use = settingsForm.$('preview.use');
        return (
            <div className={ cn('row') }>
                <label className={ cn('row-label') }>{ height.label }</label>
                <input
                    className={ cn('row-input') }
                    { ...height.bind() }
                />
            </div>
        );
    }

    renderPreviewPostfixControl(cn) {
        const { settingsForm } = this.props;
        const postfix = settingsForm.$('preview.postfix');
        return (
            <div className={ cn('row') }>
                <label className={ cn('row-label') }>{ postfix.label }</label>
                <input
                    className={ cn('row-input') }
                    { ...postfix.bind() }
                />
            </div>
        );
    }

    renderPreviewUseControl(cn) {
        const { settingsForm } = this.props;
        const use = settingsForm.$('preview.use');
        return (
            <div className={ cn('row') }>
                <label className={ cn('row-label') } />
                <input
                    className={ cn('row-checkbox') }
                    { ...use.bind() }
                />
                <label className={ cn('row-checkbox-text') }>
                    { use.label }
                </label>
            </div>
        );
    }

    renderPreviewControls(cn) {
        const { settingsForm } = this.props;
        const preview = settingsForm.$('preview');
        const use = settingsForm.$('preview.use');
        return (
            <fieldset className={ cn('fieldset') }>
                <legend className={ cn('legend') }>
                    { preview.label }
                    <input { ...use.bind() } />
                </legend>
                { this.renderPreviewWidthControl(cn) }
                { this.renderPreviewHeightControl(cn) }
                { this.renderPreviewPostfixControl(cn) }
            </fieldset>
        );
    }

    renderWatermarkImageControl(cn) {
        const { settingsForm } = this.props;
        const image = settingsForm.$('watermark.image');
        return (
            <div className={ cn('row') }>
                <label className={ cn('row-label') }>{ image.label }</label>
                <SelectWatermark
                    className={ cn('row-watermark') }
                    { ...image.bind() }
                />
            </div>
        );
    }

    renderWatermarkOpacityControl(cn) {
        const { settingsForm } = this.props;
        const opacity = settingsForm.$('watermark.opacity');
        const image = settingsForm.$('watermark.image');
        const hidden = !image.value;
        return (
            <div className={ cn('row', { hidden }) }>
                <label className={ cn('row-label') }>{ opacity.label }</label>
                <input
                    className={ cn('row-input') }
                    { ...opacity.bind() }
                />
            </div>
        );
    }

    renderWatermarkSizeControl(cn) {
        const { settingsForm } = this.props;
        const size = settingsForm.$('watermark.size');
        const image = settingsForm.$('watermark.image');
        const hidden = !image.value;
        return (
            <div className={ cn('row', { hidden }) }>
                <label className={ cn('row-label') }>{ size.label }</label>
                <input
                    className={ cn('row-input') }
                    { ...size.bind() }
                />
            </div>
        );
    }

    renderWatermarkPositionXControl(cn) {
        const { settingsForm } = this.props;
        const positionX = settingsForm.$('watermark.positionX');
        const image = settingsForm.$('watermark.image');
        const hidden = !image.value;
        return (
            <div className={ cn('row', { hidden }) }>
                <label className={ cn('row-label') }>{ positionX.label }</label>
                <select
                    className={ cn('row-select') }
                    { ...positionX.bind() }
                >
                    {
                        positionX.extra.positions.map(val => (
                            <option
                                key={ val }
                                value={ val }
                            >
                                { WatermarkPositions.horizontal[val].text }
                            </option>
                        ))
                    }
                </select>
            </div>
        );
    }

    renderWatermarkPositionYControl(cn) {
        const { settingsForm } = this.props;
        const positionY = settingsForm.$('watermark.positionY');
        const image = settingsForm.$('watermark.image');
        const hidden = !image.value;
        return (
            <div className={ cn('row', { hidden }) }>
                <label className={ cn('row-label') }>{ positionY.label }</label>
                <select
                    className={ cn('row-select') }
                    { ...positionY.bind() }
                >
                    {
                        positionY.extra.positions.map(val => (
                            <option
                                key={ val }
                                value={ val }
                            >
                                { WatermarkPositions.vertical[val].text }
                            </option>
                        ))
                    }
                </select>
            </div>
        );
    }

    renderWatermarkControls(cn) {
        const { settingsForm } = this.props;
        const watermark = settingsForm.$('watermark');
        return (
            <fieldset className={ cn('fieldset') }>
                <legend className={ cn('legend') }>{ watermark.label }</legend>
                { this.renderWatermarkImageControl(cn) }
                { this.renderWatermarkOpacityControl(cn) }
                { this.renderWatermarkSizeControl(cn) }
                { this.renderWatermarkPositionXControl(cn) }
                { this.renderWatermarkPositionYControl(cn) }
            </fieldset>
        );
    }

    renderNamingPrefixControl(cn) {
        const { settingsForm } = this.props;
        const prefix = settingsForm.$('naming.prefix');
        return (
            <div className={ cn('row') }>
                <label className={ cn('row-label') }>{ prefix.label }</label>
                <input
                    className={ cn('row-input') }
                    { ...prefix.bind() }
                />
            </div>
        );
    }

    renderNamingIndexationControl(cn) {
        const { settingsForm } = this.props;
        const indexation = settingsForm.$('naming.indexation');
        return (
            <div className={ cn('row') }>
                <label className={ cn('row-label') }>{ indexation.label }</label>
                <input
                    className={ cn('row-input') }
                    { ...indexation.bind() }
                />
            </div>
        );
    }

    renderNamingFormatControl(cn) {
        const { settingsForm } = this.props;
        const format = settingsForm.$('naming.format');
        return (
            <div className={ cn('row') }>
                <label className={ cn('row-label') }>{ format.label }</label>
                <select
                    className={ cn('row-select') }
                    { ...format.bind() }
                >
                    {
                        format.extra.formats.map(val => (
                            <option
                                key={ val }
                                value={ val }
                            >
                                { val }
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
