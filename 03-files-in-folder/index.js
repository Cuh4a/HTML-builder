const fs = require('fs');
const path = require('path');

const pathFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathFolder, {withFileTypes:true}, (err, elements) => {
  if(err) throw err;
  const files = elements.filter(el => el.isFile() === true);
  files.forEach((file) => {
    const pathFile = path.join(pathFolder, file.name);
    const fileObj = path.parse(pathFile); 
    fs.stat(pathFile, (err, stats) => {
      if(err) throw err;
      const size = stats.size;
      console.log(
        `${fileObj.name} - ${fileObj.ext.slice(1)} - ${size.toString()}b`
      );
    });
  });
});