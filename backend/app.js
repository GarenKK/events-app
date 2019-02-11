/*global require*/
'use strict';

var bodyParser = require('body-parser'),
    express = require('express'),
    server = express(),
    passport = require('passport'),
    db = require('./database/database.js'),
    user = require('./user.js'),
    events = require('./events.js'),
    conf = require('./conf.js');

require('./passport');

var allowCrossDomain = function (req, res, next) {
    var allowedOrigins = [
            'http://localhost:8081'
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

server.post('/login', user.login);
// user
var user_uri = '/user';
//server.get(user_uri + '/events', passport.authenticate('jwt', {session: false}), user.events);
server.use(user_uri + "*", passport.authenticate('jwt', {session: false}));
server.get(user_uri + '/events', user.events);
server.post(user_uri + '/join', user.join);
server.put(user_uri + '/create', user.create);
server.put(user_uri + '/:id', user.edit);
server.delete(user_uri + '/:id', user.delete);

// events
var events_uri = '/events';
server.get(events_uri + '/all', events.getAll);
server.get(events_uri + '/:id', events.getEvent);

server.listen(conf.server.port, function () {
    db.init();
    console.log('server listening on: http://' + conf.server.address + ':' + conf.server.port);
});