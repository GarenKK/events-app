require('dotenv').config();
var ip = require('ip');

var conf = {};

conf.server = {
	address: ip.address(),
	port: process.env.PORT || 8080
};

conf.nano = {
	url: "http://" + ip.address() + ":5984",
	db: "events"
};

conf.build = {
    viewsPath: './database/views/',
    docsPath: './database/docs/'
};

module.exports = conf;