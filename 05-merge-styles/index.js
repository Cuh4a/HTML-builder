const fs = require('fs');
const path = require('path');

const pathFolter = path.join(__dirname, 'styles');
const pathFile = path.join(__dirname, 'project-dist', 'bundle.css');

async function createFileCss() {
    try {
        await fs.promises.writeFile(pathFile, '');
        const files = await fs.promises.readdir(pathFolter, {
            withFileTypes: true,
        });
        for (const file of files) {
            const filePath = path.join(pathFolter, file.name);
            const filePathObj = path.parse(filePath);
            if (file.isFile() && filePathObj.ext === '.css') {
                let data = '';
                const readStream = fs.createReadStream(filePath, 'utf-8');
                readStream.on('data', (chunk) => (data += chunk));
                readStream.on('end', () =>
                    fs.promises.appendFile(pathFile, data)
                );
            }
        }

        console.log('Создан файл bandle.css');
    } catch (err) {
        console.error(err);
    }
}

createFileCss();