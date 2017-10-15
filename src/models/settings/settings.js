import { observable, computed, action } from 'mobx';

import defaultSettings from '../../config/default-settings';

export default class SettingsModel {
    @observable resize = {
        width: defaultSettings.resize.width,
        height: defaultSettings.resize.height
    }

    @observable naming = {
        prefix: defaultSettings.naming.prefix,
        indexation: defaultSettings.naming.indexation
    }
s
    @observable watermark = {
        image: defaultSettings.watermark.image,
        opacity: defaultSettings.watermark.opacity,
        format: defaultSettings.watermark.format
    }

    @observable format;

    @action setResizeWidth(width) {
        this.resize.width = width;
    }

    @action setResizeHeight(height) {
        this.resize.height = height;
    }

    @action setWatermarkImage(image) {
        this.watermark.image = image;
    }

    @action setWatermarkOpacity(opacity) {
        this.watermark.opacity = opacity;
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
