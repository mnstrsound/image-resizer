import { RouterStore } from 'mobx-react-router';

class NavigationController {
    constructor(routingStore) {
        this.routingStore = routingStore;
    }

    toMainScreen() {
        this.routingStore.push('/');
    }

    toCreateScreen() {
        this.routingStore.push('/create');
    }

    toEditScreen(id) {
        this.routingStore.push(`/edit/${id}`);
    }

    toLimitScreen(id, period) {
        this.routingStore.push(`/limit/${id}/${period}`);
    }
}

export default new NavigationController(new RouterStore());
