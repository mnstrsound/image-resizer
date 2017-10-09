import uniqueFilename from 'unique-filename';

import paths from '../config/paths';

export default () => (
    uniqueFilename(paths.tempDir)
);
