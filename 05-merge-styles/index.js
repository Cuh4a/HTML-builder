const path = require('path');
const fs = require('fs');
const pathProject = path.join(__dirname, 'project-dist');
const pathStyles = path.join(__dirname, 'styles');

fs.readdir(pathStyles, (err, data) => {
    let arr = data;
    fs.open(`${pathProject}/bundle.css`, 'w', (err) => {
        if (err) throw err;
    })
    arr = arr.filter(el => (path.extname(el) === '.css'));

    for (let i = 0; i < arr.length; i++) {
        fs.readFile(`${pathStyles}/${arr[i]}`, 'utf-8', (err, data) => {
            fs.appendFile(`${pathProject}/bundle.css`, `${data}`, (err) => {
                if (err) throw err;
            });
        })
    }
})