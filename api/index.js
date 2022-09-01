var express = require('express');
var data = require('./data.json');
var app = express();


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/test_suites', function (req, res) {
  res.send(data);
});

app.listen(3456, function () {
  console.log('Records API listening on port 3456!')
});
