require('dotenv').config();
var ip = require('ip'),
	hash = require('salted-md5');

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

conf.hashPassword = function (data) {
	return saltedMd5(data, data.substring(0,1));
};

module.exports = conf;