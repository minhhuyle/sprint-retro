const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const serveStatic = require('serve-static')
const SRC_PATH = '/src';
const HTML_PATH = __dirname + '/dist';
const BDD_PATH = __dirname + SRC_PATH + '/data';
var bddService = require('./src/services/bdd.service');

app.get('/',function(req,res){
  bddService.appendData(BDD_PATH + '/oracle_low_cost.bdd',  'oook');

  res.sendFile(path.join(HTML_PATH + '/index.html'));
});


// ---- SERVE APLICATION PATHS ---- //
app.all('*', function (req, res) {
  res.sendFile(path.join(HTML_PATH+req.url));
});

app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at');
console.log('http://localhost:3000/');
