import { exec } from 'child_process';
import path from 'path';

export default class ImageMagick {
    static resize(file, size, filePath) {
        return new Promise((resolve, reject) => {
            exec(`convert ${file} \
                -resize ${size} \
                -gravity center \
                -crop ${size}+0+0 \
                ${filePath}`,
            (err) => {
                if (err) reject({ err, file });
                resolve(filePath);
            });
        });
    }

    static resizeAll(files, { width, height }, { prefix, indexation, format }, dir) {
        const size = `${width}x${height}^`;

        return Promise.all(
            files.map(
                (file, index) => ImageMagick.resize(
                    file,
                    size,
                    path.join(dir, `${prefix}${Number(indexation) + index}.${format}`)
                )
            )
        );
    }

    static watermark(file, watermarkPath, { opacity }, filePath) {
        return new Promise((resolve, reject) => {
            exec(`composite \
                -dissolve ${opacity}% \
                -gravity center \
                ${watermarkPath} \
                ${file} \
                ${filePath}`,
            (err) => {
                if (err) reject(err);
                resolve(filePath);
            });
        });
    }

    static watermarkAll(files, watermarkPath, options, { prefix, indexation, format }, dir) {
        return Promise.all(
            files.map(
                (file, index) => ImageMagick.watermark(
                    file,
                    watermarkPath,
                    options,
                    path.join(dir, `${prefix}${Number(indexation) + index}.${format}`)
                )
            )
        );
    }
}
