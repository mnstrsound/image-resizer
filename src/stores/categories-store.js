import { observable } from 'mobx';

class CategoriesStore {
    @observable categories = [];

    constructor(categories) {
        this.categories = categories;
    }
}

export default CategoriesStore;
