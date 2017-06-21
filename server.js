'use strict';
var express = require('express');
var bodyParser = require('body-parser') ;
var router = express.Router();
var app = express();

var basicAuth = require('basic-auth');
 
 var fs = require('fs'),
    path = require('path');
    
 var _ = require('lodash');

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

var directories = getDirectories(__dirname + '/sites');

var html = "<h3>List of sites</h3><br/>";

_.forEach(directories, function(currentdir){
    html += '<a href="/'+currentdir+'">'+currentdir+'</a><br/>';
});
 
fs.writeFile(__dirname + '/sites/index.html', html, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 
 /*
var auth = function (req, res, next) {
  var user = basicAuth(req);
  if (!user || !user.name || !user.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
  if (user.name === 'geo' && user.pass === '123456') {
	  	//console.log('God is logged!');
	  	req.connected_users = {ip:req.connection.remoteAddress, user:user.name};
    	next();
  } else {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
}*/

// Authorise les requêtes cross domaine
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use(bodyParser.json());



app.use('/', /*auth, */express.static('sites'));

var port = 2704;
app.listen(port, function(){
	console.log("Listenning on port: " + port);
});

/**
 * Allow to catch uncaughtException Exception
 */
process.on('uncaughtException', function(error){
    console.log(error);
    setTimeout(process.exit, 5000, 1);
});