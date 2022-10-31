const path = require('path');
const fs = require('fs');
const pathDirectory = path.join(__dirname, 'files');
const {
    readdir,
    mkdir,
    rm,
    copyFile,
} = require('fs/promises');



async function copyDir(from, to) {
    async function delayedFileCopy(file) {
        const srcPath = path.join(from, file.name);
        const destPath = path.join(to, file.name);

        if (file.isFile()) {
            await copyFile(srcPath, destPath);
        } else {
            await copyDir(srcPath, destPath);
        }
    }

    try {
        await rm(to, { force: true, recursive: true });
        await mkdir(to, { recursive: true });

        const folderContent = await readdir(from, { withFileTypes: true });

        const promises = folderContent.map(delayedFileCopy);
        await Promise.all(promises);
    } catch (err) {
        console.error(err);
    }
}

const inPath = path.join(__dirname, 'files');
const outPath = path.join(__dirname, 'files-copy');

copyDir(inPath, outPath);