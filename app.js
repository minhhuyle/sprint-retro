const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const SRC_PATH = '/src';
const HTML_PATH = __dirname + SRC_PATH;

router.get('/',function(req,res){
  res.sendFile(path.join(HTML_PATH + '/index.html'));
});


app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at');
console.log('http://localhost:3000/');