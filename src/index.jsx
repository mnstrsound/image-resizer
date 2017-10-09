import ReactDOM from 'react-dom';
import { syncHistoryWithStore } from 'mobx-react-router';
import { createBrowserHistory } from 'history';

import Root from './root';
import initStores from './stores';

const stores = initStores(window.preloadedState);
const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, stores.routerStore);
const root = document.getElementById('app');

ReactDOM.render(<Root stores={ stores } history={ history } />, root);
