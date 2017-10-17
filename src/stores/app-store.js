import { observable, action } from 'mobx';

import SettingsModel from '../models/settings';

export default class AppStore {
    settings = new SettingsModel()

    @observable images = []

    @action setImages(images) {
        this.images = images;
    }

    @action process() {
        const { watermark: { image: watermarkImage, ...watermark }, ...values } = this.settings.values;
        const formData = new FormData();

        formData.append('settings', JSON.stringify({ ...values, watermark }));

        Array.prototype.forEach.call(this.images, (image, index) => {
            formData.append(`file${index}`, image);
        });

        if (watermarkImage) formData.append('watermark', watermarkImage);

        fetch('/api/images', {
            method: 'POST',
            body: formData
        });
    }
}
