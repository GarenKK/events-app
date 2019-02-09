/*global require*/
'use strict';

var bodyParser = require('body-parser'),
    express = require('express'),
    server = express(),
    user = require('./user.js'),
    conf = require('./conf.js');

var allowCrossDomain = function (req, res, next) {
    var allowedOrigins = [
            '*'
        ],
        origin = req.headers.origin;

    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
server.use(allowCrossDomain);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

server.get('/', function (req, res) {
    res.send('Events api server is running!');
});

// user
var user_uri = '/user';
server.post(user_uri + '/login', user.login);

server.listen(conf.server.port, function () {
    console.log('server listening on: http://' + conf.server.address + ':' + conf.server.port);
});