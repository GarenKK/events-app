/*global require*/
'use strict';

var bodyParser = require('body-parser'),
    express = require('express'),
    server = express(),
    fs = require('fs'),
    path = require('path'),
    passport = require('passport'),
    db = require('./database/database.js'),
    user = require('./user.js'),
    events = require('./events.js'),
    conf = require('./conf.js');

require('./passport');

var allowCrossDomain = function (req, res, next) {
    var allowedOrigins = [
            'http://localhost:8080',
            'http://localhost:8081'
        ],
        origin = req.headers.origin;

    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
};
server.use(passport.initialize())
server.use(passport.session())
server.use(allowCrossDomain);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

server.options('*', function (req, res) {res.end()});
server.get('/', function (req, res) {
    res.send('Events api server is running!');
});

server.post('/login', user.login);
// user
var user_uri = '/user';
server.use(user_uri + "/*", passport.authenticate('jwt', {session: false}));
server.get(user_uri + '/events', user.events);
server.post(user_uri + '/join', user.join);
server.put(user_uri + '/create', user.create);
server.put(user_uri + '/:id', user.edit);
server.delete(user_uri + '/:id', user.delete);

// events
var events_uri = '/events';
server.get(events_uri + '/all', events.getAll);
server.get(events_uri + '/:id', events.getEvent);

// static
server.use('/static/:id', function (req, res) {
    var filePath = path.join(__dirname, "/static/" + req.params.id);
    var stat = fs.statSync(filePath);
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': stat.size
    });
    var readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
});

server.listen(conf.server.port, function () {
    db.init();
    console.log('server listening on: http://' + conf.server.address + ':' + conf.server.port);
});