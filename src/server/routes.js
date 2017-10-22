import Router from 'koa-router';
import mkdirp from 'mkdirp-promise';
import findRemoveSync from 'find-remove';
import fs from 'fs';

import ImageMagick from './lib/imagemagick';

import handleError from './lib/handle-error';
import zip from './lib/zip';
import tempDir from './lib/temp-dir';

const router = new Router();

router.get('/index.html', (ctx) => {
    ctx.render('index', { state: JSON.stringify({}) });
});

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

    try {
        await mkdirp(dir);
    } catch (err) {
        ctx.body = handleError(err);
        return;
    }


    try {
        await ImageMagick.processAll(
            filesPaths,
            resizeSettings,
            watermarkPath,
            watermarkSettings,
            namingSettings,
            dir
        );
    } catch (err) {
        ctx.body = handleError(err);
        return;
    }

    try {
        ctx.body = await zip(dir);
        fs.rmdir(dir, (err) => {

        });
    } catch (err) {
        ctx.body = handleError(err);
    }
});

export function routes() { return router.routes(); }
export function allowedMethods() { return router.allowedMethods(); }
