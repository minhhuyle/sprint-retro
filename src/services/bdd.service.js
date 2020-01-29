const fs = require('fs');


var appendData = function () {


};

module.exports = {
  appendData: function (path, data) {
    fs.appendFile(path,  data, function (err) {
      if (err) {
        console.log('Cannot saved data ' + err);
        throw err;
      }
    });
  }
};
