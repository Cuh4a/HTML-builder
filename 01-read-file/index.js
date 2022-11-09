const fs = require('fs');
const path = require('path');
const stream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
let res = '';

stream.on('data', chunk => res += chunk);
stream.on('end', () => console.log(res));
stream.on('error', error => console.log('Error', error.message));