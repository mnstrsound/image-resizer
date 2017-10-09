import im from 'node-imagemagick';


export default class ImageMagick {
    static resize(file, index, settings) {
        const { width, height } = settings;
        const size = `${width}x${height}^`;

        return new Promise((resolve, reject) => {
            im.convert(
                [
                    file,
                    '-resize', size,
                    '-gravity', 'center',
                    '-crop', `${size}+0+0`,
                    `./convert/kittens-small${index}.jpg`
                ], (err, stdout) => {
                    if (err) reject(err);
                    else resolve(stdout);
                });
        });
    }

    static resizeAll(files, settings) {
        return Promise.all(
            files.map((file, index) => this.resize(file, index, settings))
        );
    }
}
