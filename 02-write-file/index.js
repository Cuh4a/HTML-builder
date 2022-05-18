const fs = require('fs');
const path = require('path');
const input = process.stdin;
const output = process.stdout;
const startMsg = 'Hi, you craeted file! Please enter text!\n';
const doneMsg = 'Goodbye! Good luck in learning!';

const pathFile = path.join(__dirname, 'text.txt');

fs.writeFile(pathFile, '', (err) => {
  if (err) throw err;
});

const wrStm = fs.createWriteStream(pathFile);

output.write(startMsg);
input.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    process.exit();
  } else {
    wrStm.write(data.toString());
  }
});

process.on('SIGINT', process.exit);
process.on('exit', () => output.write(doneMsg));