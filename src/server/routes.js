import Router from 'koa-router';
import mkdirp from 'mkdirp-promise';
import ImageMagick from './lib/imagemagick';

import zip from './lib/zip';
import tempDir from './lib/temp-dir';

const router = new Router();

router.post('/api/images', async (ctx) => {
    const dir = tempDir();
    const { resize, watermark, naming } = JSON.parse(ctx.request.body.fields.settings);
    const { files: { watermark: watermarkImage, ...files } } = ctx.request.body;
    const toProcessFiles = Object.keys(files).map(key => files[key].path);
    let processedFiles;

    await mkdirp(dir);

    processedFiles = await ImageMagick.resizeAll(
        toProcessFiles,
        resize,
        naming,
        dir
    );

    if (watermarkImage) {
        await ImageMagick.watermarkAll(
            processedFiles,
            watermarkImage.path,
            watermark,
            naming,
            dir
        );
    }

    ctx.body = await zip(dir);
});

export function routes() { return router.routes(); }
export function allowedMethods() { return router.allowedMethods(); }
