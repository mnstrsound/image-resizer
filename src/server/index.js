import Koa from 'koa';
import koaBody from 'koa-body';
import pug from 'js-koa-pug';

import koaBodyConfig from './config/koa-body';
import { routes, allowedMethods } from './routes';

const app = new Koa();

const env = process.env.NODE_ENV || 'development';

app.use(pug('src/server/views'));
app.use(koaBody(koaBodyConfig));
app.use(routes());
app.use(allowedMethods());

app.use((ctx) => {
    ctx.render('index', { state: JSON.stringify({}), env });
});

app.listen(3000);
