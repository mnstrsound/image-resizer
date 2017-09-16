import Koa from 'koa';
import koaStatic from 'koa-static';
import koaBody from 'koa-body';
import pug from 'js-koa-pug';

import getState from './getState';
import { routes, allowedMethods } from './routes';

getState().then((state) => {
    const app = new Koa();

    app.use(pug('src/server/views'));
    app.use(koaStatic('build'));
    app.use(koaBody());
    app.use(routes());
    app.use(allowedMethods());

    app.use((ctx) => {
        ctx.render('index', { state: JSON.stringify(state) });
    });

    app.listen(3000);
});
