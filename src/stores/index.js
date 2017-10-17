import { RouterStore } from 'mobx-react-router';
import AppStore from './app-store';

export default () => ({
    routerStore: new RouterStore(),
    appStore: new AppStore()
});
