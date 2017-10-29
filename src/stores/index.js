import { RouterStore } from 'mobx-react-router';
import appStore from './app-store';
import settingsForm from './settings-form-store';

export default () => ({
    routerStore: new RouterStore(),
    appStore,
    settingsForm
});
