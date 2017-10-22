import { observable, action, computed } from 'mobx';
import { arrayMove } from 'react-sortable-hoc';

import SettingsModel from '../models/settings';

export default class AppStore {
    settings = new SettingsModel()

    @observable images = []

    @observable link = null;

    @action setImages(images) {
        this.images = images;
    }

    @action deleteImage(selectedImage) {
        this.images = this.images.filter(image => image !== selectedImage);
    }

    @action moveImages(oldIndex, newIndex) {
        this.images = arrayMove(this.images, oldIndex, newIndex);
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
        })
            .then(data => data.text())
            .then((link) => {
                this.link = link;
            });
    }

    @computed get valid() {
        return this.images.length > 0 && this.images.reduce((acc, item) => (acc += item.size), 0) < (1024 * 1024 * 100);
    }
}
