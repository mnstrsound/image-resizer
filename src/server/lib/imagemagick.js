import { exec } from 'child_process';
import path from 'path';

import getWatermarkGravity from '../utils/get-watermark-gravity';

export default class ImageMagick {
    static request(filePath, resizeSettings, watermarkPath, watermarkSettings, fileDest) {
        const { width, height, crop } = resizeSettings;
        const { opacity, size, positionX, positionY } = watermarkSettings;
        const imageSize = `${width}x${height}`;
        const watermarkSize = `${(width * Number(size)) / 100}x${(height * Number(size)) / 100}`;
        const gravity = getWatermarkGravity(positionX, positionY);
        let execString = `convert \\( ${filePath} \
            -resize ${imageSize}^ \
            -gravity center \
            ${crop ? `-crop ${imageSize}+0+0` : ''} \\) \
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
                resolve(filePath);
            });
        });
    }

    static requestAll(filesPaths, resizeSettings, watermarkPath, watermarkSettings, namingSettings, dir) {
        const { prefix, indexation, format } = namingSettings;
        return Promise.all(
            filesPaths.map(
                (filePath, index) => ImageMagick.request(
                    filePath,
                    resizeSettings,
                    watermarkPath,
                    watermarkSettings,
                    path.join(dir, `${prefix}${Number(indexation) + index}.${format}`)
                )
            )
        );
    }
}
