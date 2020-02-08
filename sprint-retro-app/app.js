const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require("body-parser");
const SRC_PATH = '/src';
const HTML_PATH = __dirname + '/dist';
const BDD_PATH = __dirname + SRC_PATH + '/data/oracle_low_cost.bdd';
const uuidv4 = require('uuid/v4');
const bddService = require('./src/services/bdd.service');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
  // bddService.appendData(BDD_PATH + '/oracle_low_cost.bdd',  'oook');
  res.sendFile(path.join(HTML_PATH + '/index.html'));
});


app.get('/reset',function(req,res){
  bddService.clearData(BDD_PATH);
  res.status(200).send({response : 'OK'});
});

app.get('/post-its',function(req,res){
  const bdd = bddService.readData(BDD_PATH);
  bddService.writeData(BDD_PATH, bdd);
  res.status(200).send(bdd);
});

app.post('/add-post-it',function(req,res){
  const rawMessage = req.body;
  const bdd = bddService.readData(BDD_PATH);
  rawMessage.data.id = uuidv4();
  bdd[rawMessage.type].push(rawMessage.data);

  bddService.writeData(BDD_PATH, bdd);
  res.status(200).send({response : 'OK'});
});

app.post('/vote',function(req,res){
  const rawMessage = req.body;
  const bdd = bddService.readData(BDD_PATH);
  for (let postIt of bdd[rawMessage.type]) {
    if(postIt.id === rawMessage.id) {
      postIt.vote++;
      break;
    }
  }
  bddService.writeData(BDD_PATH, bdd);
  res.status(200).send({response : 'OK'});
});

// ---- SERVE APLICATION PATHS ---- //
app.all('*', function (req, res) {
  let file = req.url;
  if(req.url=== '/fontawesome-webfont.woff2?v=4.7.0') {
    file = '/fontawesome-webfont.woff2';
  }
  res.sendFile(path.join(HTML_PATH+file));
});

app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at');
console.log('http://localhost:3000/');