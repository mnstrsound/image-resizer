import im from 'node-imagemagick';
import path from 'path';

export default class ImageMagick {
    static resize(file, index, dir, settings) {
        const { width, height } = settings;
        const size = `${width}x${height}^`;
        const filePath = path.join(dir, `${index}.jpg`);

        return new Promise((resolve, reject) => {
            im.convert(
                [
                    file,
                    '-resize', size,
                    '-gravity', 'center',
                    '-crop', `${size}+0+0`,
                    filePath
                ], (err, stdout) => {
                    if (err) reject(err);
                    else resolve(stdout);
                });
        });
    }

    static resizeAll(files, dir, settings) {
        return Promise.all(
            files.map((file, index) => this.resize(file, index, dir, settings))
        );
    }
}
