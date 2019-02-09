require('dotenv').config();
var ip = require('ip');

var conf = {};

conf.server = {
	address: ip.address(),
	port: process.env.PORT || 8080
};

conf.nano = {
	url: "http://" + ip.address() + ":5984",
	db: "events",
    timeout: 600 * 1000,
    user: process.env.COUCH_USER,
    pass: process.env.COUCH_PASS
};

conf.build = {
    viewsPath: './database/views/',
    docsPath: './database/docs/'
};

conf.secret = process.env.SECRET || 'your_jwt_secret';

module.exports = conf;