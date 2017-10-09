import fs from 'fs';
import archiver from 'archiver';

export default () => {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream('./archives/archive.zip');
        const archive = archiver('zip');

        archive.on('warning', (err) => {
            if (err.code === 'ENOENT') {

            } else reject(err);
        });

        archive.on('error', function(err) {
            throw err;
        });
        output.on('close', () => {
            console.log(archive.pointer() + ' total bytes');
            console.log('archiver has been finalized and the output file descriptor has closed.');
        });

        archive.pipe(output);
        archive.directory('./convert/', 'files');
        archive.finalize();
    });
};
