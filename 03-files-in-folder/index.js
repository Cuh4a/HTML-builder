const path = require('path');
const fs = require('fs');

fs.readdir('03-files-in-folder/secret-folder/', {
    withFileTypes: true
}, (err, data) => {
    let arr = [];
    if (err) console.error(err);
    for (let i = 0; i < data.length; i++) {
        if (data[i].isFile() === true) {
            arr.push(data[i].name)
        }
    }
    for (let i = 0; i < arr.length; i++) {
        let a = arr[i];
        fs.stat('03-files-in-folder/secret-folder/' + a, (err, data) => {
            if(err) console.error(err);
            let name = path.parse('03-files-in-folder/secret-folder/' + a).name;
            let ext = path.parse('03-files-in-folder/secret-folder/' + a).ext.replace('.', "");
            let size = `${(data.size / 1024).toFixed(3)}kb`;
            console.log(`${name} - ${ext} - ${size}`);
        })
    }
})