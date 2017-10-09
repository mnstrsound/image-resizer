import Koa from 'koa';
import koaStatic from 'koa-static';
import koaBody from 'koa-body';
import pug from 'js-koa-pug';

import koaBodyConfig from './config/koa-body';
import { routes, allowedMethods } from './routes';

const app = new Koa();

app.use(pug('src/server/views'));
app.use(koaStatic('build'));
app.use(koaBody(koaBodyConfig));
app.use(routes());
app.use(allowedMethods());

app.use((ctx) => {
    ctx.render('index', { state: JSON.stringify({}) });
});

app.listen(3000);
