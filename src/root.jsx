import React from 'react';
import { Provider } from 'mobx-react';
import { Router, Switch } from 'react-router';
import { Route } from 'react-router-dom';

import 'arui-feather/main.css';

import './root.css';

import Main from './pages/main';

const Root = ({ stores, history, basename }) => (
    <Provider { ...stores }>
        <Router history={ history } basename={ basename }>
            <Switch>
                <Route exact={ true } path='/' component={ Main } />
            </Switch>
        </Router>
    </Provider>
);

export default Root;
