const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const bundlPath = path.resolve(__dirname, 'project-dist');
const stylePath = path.resolve(__dirname, 'styles');

fsPromises.mkdir(bundlPath, { recursive: true });

fs.writeFile(bundlPath + '/style.css', '', () => { });

const bundleCSS = async () => {
  const files = await fsPromises.readdir(stylePath, { withFileTypes: true });
  files.forEach((x, i) => {
    const ext = x.name.split('.');
    if (ext[ext.length - 1] === 'css') {
      const stream = fs.ReadStream(stylePath + `/${x.name}`);
      stream.on('data', (data) => {
        if (!i) {
          fs.writeFile(bundlPath + '/style.css', `${data.toString()}`, { flag: 'a+' }, () => { });
        } else {
          fs.writeFile(bundlPath + '/style.css', `\n\n${data.toString()}`, { flag: 'a+' }, () => { });
        }
      });
    }
  });
};
bundleCSS();

fsPromises.mkdir(bundlPath + '/assets', { recursive: true });

const listOfFiles = async (path, outputPath) => {
  const files = await fsPromises.readdir(path, { withFileTypes: true });
  for (const file of files) {
    if (file.isFile()) {
      await fsPromises.copyFile(path + `/${file.name}`, outputPath + `/${file.name}`);
    } else {
      await fsPromises.mkdir(bundlPath + '/assets' + `/${file.name}`, { recursive: true });
      await fsPromises.rm(outputPath + `/${file.name}`, { recursive: true });
      await fsPromises.mkdir(bundlPath + '/assets' + `/${file.name}`, { recursive: true });
      await listOfFiles(path + `/${file.name}`, outputPath + `/${file.name}`);
    }
  }
  return;
};

listOfFiles(__dirname + '/assets', __dirname + '/project-dist' + '/assets');

const stream = fs.ReadStream(path.resolve(__dirname, 'template.html'));

fs.writeFile(bundlPath + '/index.html', '', () => { });

const bundleHTML = async () => {
  let string;
  stream.on('data', async (data) => {
    string = data.toString();
    const files = await fsPromises.readdir(__dirname + '/components', { withFileTypes: true });
    for (const file of files) {
      const copyContentStream = fs.ReadStream(path.resolve(__dirname, 'components', file.name));
      copyContentStream.on('data', async (data) => {
        const regex = new RegExp(`{{${file.name.split('.')[0]}}}`, 'g');
        string = await string.replace(regex, data.toString());
      });

      copyContentStream.on('end', () => {
        fs.writeFile(bundlPath + '/index.html', string, () => { });
      });
    }
  });
};


bundleHTML();