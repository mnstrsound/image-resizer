import { observable, computed, action } from 'mobx';

export default class SettingsModel {
    @observable width = 0;
    @observable height = 0;

    @action setWidth(width) {
        this.width = width;
    }

    @action setHeight(height) {
        this.height = height;
    }
}
