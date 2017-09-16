import { RouterStore } from 'mobx-react-router';

class NavigationController {
    constructor(routingStore) {
        this.routingStore = routingStore;
    }

    toMainScreen() {
        this.routingStore.push('/');
    }

    toCreateScreen() {
        this.routingStore.push('create');
    }

    toLimitScreen(id) {
        this.routingStore.push(`/limit/${id}`);
    }
}

export default new NavigationController(new RouterStore());
