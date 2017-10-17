import { observable, computed, action } from 'mobx';

import defaultSettings from '../../config/default-settings';

export default class SettingsModel {
    @observable resize = {
        width: defaultSettings.resize.width,
        height: defaultSettings.resize.height,
        crop: defaultSettings.resize.crop
    }
s
    @observable watermark = {
        image: defaultSettings.watermark.image,
        opacity: defaultSettings.watermark.opacity,
        size: defaultSettings.watermark.size,
        positionX: defaultSettings.watermark.positionX,
        positionY: defaultSettings.watermark.positionY
    }

    @observable naming = {
        prefix: defaultSettings.naming.prefix,
        indexation: defaultSettings.naming.indexation,
        format: defaultSettings.naming.format
    }

    @action setResizeWidth(width) {
        this.resize.width = width;
    }

    @action setResizeHeight(height) {
        this.resize.height = height;
    }

    @action setResizeCrop(crop) {
        this.resize.crop = crop;
    }

    @action setWatermarkImage(image) {
        this.watermark.image = image;
    }

    @action setWatermarkOpacity(opacity) {
        this.watermark.opacity = opacity;
    }

    @action setWatermarkSize(size) {
        this.watermark.size = size;
    }

    @action setWatermarkPositionX(positionX) {
        this.watermark.positionX = positionX;
    }

    @action setWatermarkPositionY(positionY) {
        this.watermark.positionY = positionY;
    }

    @action setNamingPrefix(prefix) {
        this.naming.prefix = prefix;
    }

    @action setNamingIndexation(indexation) {
        this.naming.indexation = indexation;
    }

    @action setNamingFormat(format) {
        this.naming.format = format;
    }

    @computed get values() {
        return this;
    }
}
