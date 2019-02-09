/*global require */
'use strict';

var conf = require('./conf.js'),
    db = require('./database/database.js'),
    jwt = require('jsonwebtoken'),
    passport = require('passport'),
	user = {};

user.login = function (req, res) {
	passport.authenticate('local', {session: false}, (err, user, info) => {
	    if (err || !user) {
	        return res.status(400).json({
	            message: 'Something is not right',
	            user: user
	        });
	    }
		req.login(user, {session: false}, (err) => {
			if (err) {
				res.send(err);
			}
            const token = jwt.sign(user, conf.secret);
            return res.json({user, token});
        });
    })(req, res);
};

user.get = function (username) {
	var params = {
		key: username,
		include_docs: true
	};
    return db.view('users', 'by_username', params);
};

user.events = function (req, res) {
	console.log(req.user);
	res.end("success");
};

module.exports = user;