import { exec } from 'child_process';
import path from 'path';

import getWatermarkGravity from '../utils/get-watermark-gravity';

export default class ImageMagick {
    static process(imagePath, resizeSettings, watermarkPath, watermarkSettings, fileDest) {
        const { width, height, crop } = resizeSettings;
        const { opacity, size, positionX, positionY } = watermarkSettings;
        const imageSize = `${width}x${height}`;
        const watermarkSize = `${(width * Number(size)) / 100}x${(height * Number(size)) / 100}`;
        const gravity = getWatermarkGravity(positionX, positionY);
        let execString = `convert \\( ${imagePath} \
            -resize ${imageSize}^ \
            -gravity center \
            ${crop ? `-extent ${imageSize}` : ''} \\) \
        \\`;

        if (watermarkPath) {
            execString += `
                \\( ${watermarkPath} -resize ${watermarkSize}\\> \\) \
                -compose dissolve \
                -define compose:args='${opacity},100' \
                -gravity ${gravity} \
                -composite \
            `;
        }

        execString += `${fileDest}`;

        return new Promise((resolve, reject) => {
            exec(execString, (err) => {
                if (err) reject(err);
                resolve(imagePath);
            });
        });
    }

    static processAll(imagesPaths, resizeSettings, watermarkPath, watermarkSettings, namingSettings, dir) {
        const { prefix, indexation, format } = namingSettings;
        return Promise.all(
            imagesPaths.map(
                (imagePath, index) => ImageMagick.process(
                    imagePath,
                    resizeSettings,
                    watermarkPath,
                    watermarkSettings,
                    path.join(dir, `${prefix}${Number(indexation) + index}.${format}`)
                )
            )
        );
    }
}
