import React from 'react';
import { Provider } from 'mobx-react';
import { Router, Switch } from 'react-router';
import { Route } from 'react-router-dom';

import 'arui-feather/main.css';

import Main from './pages/main';
import Create from './pages/create';
import Limit from './pages/limit';

const Root = ({ stores, history, basename }) => (
    <Provider { ...stores }>
        <Router history={ history } basename={ basename }>
            <Switch>
                <Route exact={ true } path='/' component={ Main } />
                <Route exact={ true } path='/create' component={ Create } />
                <Route exact={ true } path='/edit/:id' component={ Create } />
                <Route exact={ true } path='/limit/:id/:period' component={ Limit } />
            </Switch>
        </Router>
    </Provider>
);

export default Root;
