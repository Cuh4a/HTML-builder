const path = require('path');
const fs = require('fs');
const { stdin, stdout } = process;

const textPath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(textPath);

writeStream.write('');

stdout.write('Hello! Please enter text:\n ');

stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') process.exit();
  writeStream.write(data);
});

process.on('SIGINT', () => {
  process.exit();
});

process.on('exit', () => stdout.write('Good Luck! Have a nice day!'));