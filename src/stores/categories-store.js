import { observable } from 'mobx';

class Categories {
    @observable categories = [];

    constructor(categories) {
        this.categories = categories;
    }
}

export default Categories;
