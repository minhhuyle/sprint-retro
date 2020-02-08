const fs = require('fs');


const appendData = function (path, data) {
  fs.appendFile(path, data, function (err) {
    if (err) {
      console.log('Cannot append data ' + err);
      throw err;
    }
  });
};

const clearData = function (path) {
  const defaultObj = {
    'GOOD': [],
    'KEEP': [],
    'BAD': []
  };
  fs.writeFile(path, JSON.stringify(defaultObj), function (err) {
    if (err) {
      console.log('Cannot clear data ' + err);
      throw err;
    }
  });
};

const writeData = function (path, data) {
  fs.writeFile(path, JSON.stringify(data), function (err) {
    if (err) {
      console.log('Cannot append data ' + err);
      throw err;
    }
  });
};

const readData = function (path) {
  return JSON.parse(fs.readFileSync(path));
};

module.exports = {
  appendData: appendData,
  clearData: clearData,
  writeData: writeData,
  readData: readData
};
