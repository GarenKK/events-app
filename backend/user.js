/*global require */
'use strict';

var conf = require('./conf.js'),
    db = require('./database/database.js'),
    jwt = require('jsonwebtoken'),
    passport = require('passport'),
	user = {};

user.login = function (req, res) {
	if (req.body.username) {
		passport.authenticate('local', {session: false}, (err, user, info) => {
			if (err) {
		        return res.status(400).json({error: err.message});
			}
			if (!user) {
		        return res.status(400).json({message: 'Bad Request'});
		    }
			req.login(user, {session: false}, (err) => {
				if (err) {
					res.send(err);
				}
	            const token = "Bearer " + jwt.sign(user, conf.token.secret, {expiresIn: conf.token.expiresIn});
	            return res.json({user, token});
	        });
	    })(req, res);
	} else {
		passport.authenticate('jwt', {session: false}, (err, user, info) => {
			if (err || !user) {
				return res.status(401).json({message: 'Unauthorized'});
			}
			return res.json({user, token: req.headers.authorization});
		})(req, res);
	}
};

user.get = function (username) {
	var params = {
		key: username,
		include_docs: true
	};
    return db.view('users', 'by_username', params);
};

user.events = function (req, res) {
	var params = {
		include_docs: true,
		descending: true,
		endkey: [req.user._id],
		startkey: [req.user._id, {}]
	}
	db.view('events', 'by_owner', params).then((body) => {
		return res.json(body);
	}).catch((err) => {
		return res.status(500).json({
            message: 'database error',
            error: err
	    });
	});
};

user.join = function (req, res) {
	if (!req.body.event_id) {
		return res.status(400).json({message: 'Bad Request'});
	}
	db.get(req.body.event_id).then((doc) => {
		if (doc.error) {
			return res.status(400).json(doc);
		}
		if (doc.owner === req.user._id) {
			return res.status(400).json({message: 'Bad Request'});
		}
		if (doc.participants.indexOf(req.user._id) === -1) {
			doc.participants.push(req.user._id);
		} else {
			return res.json({success: false});
		}
		db.insert(doc).then((doc) => {
			return res.json({success: true});
		}).catch((err) => {
			return res.status(500).json({
	            message: 'database error',
	            error: err
		    });
		});
	}).catch((err) => {
		return res.status(500).json({
            message: 'database error',
            error: err
	    });
	});
};

user.create = function (req, res) {
	if (!req.body.doc) {
		return res.status(400).json({message: 'Bad Request'});
	}
	req.body.doc.owner = req.user._id;
	req.body.doc.type = "event";
	req.body.doc.participants = [];
	db.insert(req.body.doc).then((response) => {
		return res.json(response);
	}).catch((err) => {
		return res.status(500).json({
            message: 'database error',
            error: err
	    });
	});
};

user.edit = function (req, res) {
	if (!req.params.id || !req.body.doc || !req.body.doc._rev) {
		return res.status(400).json({message: 'Bad Request'});
	}
	db.get(req.params.id).then((doc) => {
		if (doc.error) {
			return res.status(400).json(doc);
		}
		if (doc.owner != req.user._id || (req.body.doc.owner && req.body.doc.owner != req.user._id)) {
			return res.status(401).json({message: 'Unauthorized'});
		}
		var key;
		for (key in req.body.doc) {
			if (req.body.doc.hasOwnProperty(key)) {
				doc[key] = req.body.doc[key];
			}
		}
		db.insert(doc).then((body) => {
			return res.json(body);
		}).catch((err) => {
			return res.status(500).json({
	            message: 'database error',
	            error: err
		    });
		});
	}).catch((err) => {
		return res.status(500).json({
            message: 'database error',
            error: err
	    });
	});
};

user.delete = function (req, res) {
	if (!req.params.id) {
		return res.status(400).json({message: 'Bad Request'});
	}
	db.get(req.params.id).then((doc) => {
		if (doc.error) {
			return res.status(400).json(doc);
		}
		if (doc.owner != req.user._id) {
			return res.status(401).json({message: 'Unauthorized'});
		}
		db.destroy(doc._id, doc._rev).then((body) => {
			return res.json(body);
		}).catch((err) => {
			return res.status(500).json({
	            message: 'database error',
	            error: err
		    });
		});
	}).catch((err) => {
		return res.status(500).json({
            message: 'database error',
            error: err
	    });
	});
};

module.exports = user;