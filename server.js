var express = require('express');
var routes = require('./routes/app');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
  req.db = db;
  next();
});

app.get('/health', routes.getHealth);

app.listen(3000);
console.log('Listening on port 3000...');
