const fs = require('fs');
const path = require('path');

fs.readFile('01-read-file/text.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
    }
    console.log(data);
})