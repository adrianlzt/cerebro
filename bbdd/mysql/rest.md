https://www.npmjs.com/package/mysql-to-rest

Expone la mysql como una API REST


npm install mysql-to-rest express mysql

mysqlRest.js:
var express = require('express');
var mysql = require('mysql');
var mysqltorest  = require('mysql-to-rest');
var app = express();
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'alienvault'
});
var api = mysqltorest(app,connection);
app.listen(8000);

nodejs mysqlRest.js

curl localhost:8000/api/TABLA

GET /api/:table?_limit=0,10&_order[id]=DESC&id[GREAT]=4



# Docker
https://hub.docker.com/r/reduardo7/db-to-api/
