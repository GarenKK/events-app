/*global require*/
'use strict';

var bodyParser = require('body-parser'),
    express = require('express'),
    server = express(),
    passport = require('passport'),
    db = require('./database/database.js'),
    user = require('./user.js'),
    conf = require('./conf.js');

require('./passport');

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
server.use(passport.initialize())
server.use(passport.session())
server.use(allowCrossDomain);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

server.get('/', function (req, res) {
    res.send('Events api server is running!');
});

// user
var user_uri = '/user';
server.post(user_uri + '/login', user.login);
server.get(user_uri + '/events', passport.authenticate('jwt', {session: false}), user.events);

server.listen(conf.server.port, function () {
    db.init();
    console.log('server listening on: http://' + conf.server.address + ':' + conf.server.port);
});