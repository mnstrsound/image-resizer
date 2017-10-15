import { observable, computed, action } from 'mobx';

export default class SettingsModel {
    @observable resize = {
        width: 0,
        height: 0
    }

    @observable naming = {
        indexation: 0,
        prefix: ''
    }
s
    @observable watermark = {
        image: null,
        opacity: 50
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
