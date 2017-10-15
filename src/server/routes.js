import Router from 'koa-router';
import mkdirp from 'mkdirp-promise';
import ImageMagick from './lib/imagemagick';

import zip from './lib/zip';
import tempDir from './lib/temp-dir';

const router = new Router();

router.post('/api/images', async (ctx) => {
    const {
        resize: resizeSettings,
        watermark: watermarkSettings,
        naming: namingSettings
    } = JSON.parse(ctx.request.body.fields.settings);
    const { files: { watermark: watermarkImage, ...files } } = ctx.request.body;
    const filesPaths = Object.keys(files).map(key => files[key].path);
    const watermarkPath = watermarkImage ? watermarkImage.path : undefined;
    const dir = tempDir();

    await mkdirp(dir);

    await ImageMagick.requestAll(
        filesPaths,
        resizeSettings,
        watermarkPath,
        watermarkSettings,
        namingSettings,
        dir
    ).catch(e => { console.log(e); });

    ctx.body = await zip(dir);
});

export function routes() { return router.routes(); }
export function allowedMethods() { return router.allowedMethods(); }
