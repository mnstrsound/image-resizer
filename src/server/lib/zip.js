import fs from 'fs';
import archiver from 'archiver';

export default dir => (
    new Promise((resolve, reject) => {
        const zipFilePath = `${dir}.zip`;
        const output = fs.createWriteStream(zipFilePath);
        const archive = archiver('zip');

        archive.on('warning', (err) => {
            if (err.code !== 'ENOENT') reject(err);
        });

        archive.on('error', (err) => {
            reject(err);
        });

        output.on('close', () => {
            resolve(zipFilePath);
        });

        archive.pipe(output);
        archive.directory(dir, false);
        archive.finalize();
    })
);
