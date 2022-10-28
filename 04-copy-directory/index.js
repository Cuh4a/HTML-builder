const path = require('path');
const fs = require('fs');
const pathDirectory = path.join(__dirname, 'files');

fs.readdir(pathDirectory, (err, data) => {
    fs.mkdir('04-copy-directory/files-copy', {
        recursive: true
    }, (err) => {
        if (err) throw err;
    });

    for (let i = 0; i < data.length; i++) {
        fs.copyFile(`${pathDirectory}/${data[i]}`, `04-copy-directory/files-copy/${data[i]}`, (err) => {
            if (err) throw err;
          });  
    }
})


