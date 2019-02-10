/*global require */
'use strict';

var conf = require('./conf.js'),
    db = require('./database/database.js'),
    jwt = require('jsonwebtoken'),
    passport = require('passport'),
	user = {};

user.login = function (req, res) {
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
	var params = {
		include_docs: true,
		startkey: [req.user._id],
		endkey: [req.user._id, {}]
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
	if (!req.params.event_id) {
		return res.status(400).json({message: 'Bad Request'});
	}
	db.get(req.params.event_id).then((doc) => {
		if (doc.error) {
			return res.status(400).json(doc);
		}
		if (doc.owner === req.user._id) {
			return res.status(400).json({message: 'Bad Request'});
		}
		doc.participants.push(req.user._id);
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
	if (!req.params.doc) {
		return res.status(400).json({message: 'Bad Request'});
	}
	doc.owner = req.user._id;
	doc.type = "event";
	doc.participants = [];
	db.insert(doc).then((doc) => {
		return res.json(doc);
	}).catch((err) => {
		return res.status(500).json({
            message: 'database error',
            error: err
	    });
	});
};

user.edit = function (req, res) {
	if (!req.params.id || !req.params.doc || !req.params.doc._rev) {
		return res.status(400).json({message: 'Bad Request'});
	}
	db.get(req.params.id).then((doc) => {
		if (doc.error) {
			return res.status(400).json(doc);
		}
		if (doc.owner != req.user._id || (req.params.doc.owner && req.params.doc.owner != req.user._id)) {
			return res.status(401).json({message: 'Unauthorized'});
		}
		var key;
		for (key in req.params.doc) {
			if (p.hasOwnProperty(key)) {
				doc[key] = req.params.doc[key];
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