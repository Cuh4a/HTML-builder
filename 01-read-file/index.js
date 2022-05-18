// eslint-disable-next-line no-unused-vars
const fs = require('fs');
const path = require('path');

const rsl = fs.createReadStream(path.join(__dirname, 'text.txt'));
let data = '';
rsl.on('data', chunk => data += chunk);
rsl.on('end', () => console.log(data));
rsl.on('error', err => console.log('Error: ', err.message));

