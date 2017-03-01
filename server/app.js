require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
var indeed = require('./indeed');
const LOCALPORT = 8000;
var portDecision = process.env.PORT || LOCALPORT;

app.use(express.static('public'));
app.use(bodyParser.json());
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

app.use('/indeed', indeed);

app.listen(portDecision, function() {
  console.log("listening on port: ", portDecision);
});
