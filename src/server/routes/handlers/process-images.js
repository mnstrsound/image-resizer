import mkdirp from 'mkdirp-promise';
import fs from 'fs-extra';

import ImageMagick from '../../lib/imagemagick';
import handleError from '../../lib/handle-error';
import zip from '../../lib/zip';
import tempDir from '../../lib/temp-dir';
import log from '../../lib/log';

export default async (ctx) => {
    const {
        resize: resizeSettings,
        watermark: watermarkSettings,
        naming: namingSettings
    } = JSON.parse(ctx.request.body.fields.settings);
    const { files } = ctx.request.body;
    const { watermark: watermarkImage, ...images } = files;
    const imagesPaths = Object.keys(images).map(key => images[key].path);
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
            imagesPaths,
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
        const zipPath = await zip(dir);
        ctx.body = JSON.stringify({ link: zipPath });
        setTimeout(() => {
            fs.remove(zipPath);
        }, 60 * 15 * 1000);
    } catch (err) {
        ctx.body = handleError(err);
    }

    try {
        await fs.remove(dir);
    } catch (err) {
        log(err);
    }

    Object.keys(files).map(key => files[key].path).forEach((file) => {
        fs.remove(file);
    });
};
