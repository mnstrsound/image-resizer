import Router from 'koa-router';
import mkdirp from 'mkdirp-promise';
import ImageMagick from './lib/imagemagick';

import zip from './lib/zip';
import tempDir from './lib/temp-dir';

const router = new Router();

router.post('/api/images', async (ctx) => {
    const settings = JSON.parse(ctx.request.body.fields.settings);
    const { files } = ctx.request.body;
    const dir = tempDir();

    await mkdirp(dir);

    ImageMagick.resizeAll(
        Object.keys(files).map(key => files[key].path),
        dir,
        settings,
    ).then(() => zip(dir));

    ctx.body = true;
});

export function routes() { return router.routes(); }
export function allowedMethods() { return router.allowedMethods(); }
