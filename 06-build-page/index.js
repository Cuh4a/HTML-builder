const path = require('path');
const fs = require('fs');
const pathProject = path.join(__dirname, 'project-dist');
const pathStyles = path.join(__dirname, 'styles');
const pathComponents = path.join(__dirname, 'components');
const pathAssets = path.join(__dirname, 'assets');

fs.readdir(path.dirname(__dirname), (err, data) => {
    fs.mkdir(pathProject, {
        recursive: true
    }, (err) => {
        if (err) throw err;
    });
});
