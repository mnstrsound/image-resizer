import Router from 'koa-router';

import ImageMagick from './lib/imagemagick';
import zip from './lib/zip';

const router = new Router();

router.post('/api/images', async (ctx) => {
    const settings = JSON.parse(ctx.request.body.fields.settings);
    const { files } = ctx.request.body;

    ImageMagick.resizeAll(
        Object.keys(files).map(key => files[key].path),
        settings
    ).then(() => zip());

    ctx.body = true;
});

export function routes() { return router.routes(); }
export function allowedMethods() { return router.allowedMethods(); }
