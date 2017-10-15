import { exec } from 'child_process';
import path from 'path';

export default class ImageMagick {
    static request(filePath, fileOptions, watermarkPath, watermarkOptions, fileDest) {
        const { width, height } = fileOptions;
        const { opacity } = watermarkOptions;
        const size = `${width}x${height}`;

        let execString = `convert \\( ${filePath} -resize ${size}^ -gravity center -crop ${size}+0+0 \\) \\`;

        if (watermarkPath) {
            execString += `
                \\( ${watermarkPath} -resize ${size}! \\) \
                -compose dissolve \
                -define compose:args='${opacity},100' \
                -gravity center \
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
