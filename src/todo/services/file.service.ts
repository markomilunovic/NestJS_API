import * as fs from 'fs/promises';

export class FileService {
    async deleteFile(path: string): Promise<void> {
        return fs.unlink(path);
    };
};
