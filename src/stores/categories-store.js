import { action, observable } from 'mobx';

class Categories {
    @observable categories = [
        { title: 'Питание' },
        { title: 'Одежда' },
        { title: 'Развлечения' },
        { title: 'Бытовая техника' }
    ];
}

export default Categories;
