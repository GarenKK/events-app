/*global require */
'use strict';

var conf = require('./conf.js'),
    db = require('./database/database.js'),
    jwt = require('jsonwebtoken'),
    passport = require('passport'),
	events = {};

events.getAll = function (req, res) {
	db.view('events', 'by_type', {include_docs: true}).then((body) => {
		passport.authenticate('jwt', {session: false}, (err, user, info) => {
		    if (user && user._id) {
		    	body.rows = body.rows.filter(function(row) {
		    		return row.doc.owner != user._id;
		    	});
		    }
			return res.json(body);
		})(req, res);
	}).catch((err) => {
		return res.status(500).json({
            message: 'database error',
            error: err
	    });
	});
};

events.getEvent = function (req, res) {
	if (!req.params.id) {
		return res.status(400).json({message: 'Bad Request'});
	}
	db.get(req.params.id).then((doc) => {
		if (doc.error) {
			return res.status(400).json(doc);
		}
		if (!doc.participants.length) {
			return res.json(doc);
		}
		db.view('events', 'participants', {key: req.params.id, include_docs: true}).then((body) => {
			if (body.rows && body.rows.length) {
				doc.participants = body.rows.map(function (row) {
					return row.doc;
				});
				return res.json(doc);
			}
			return res.status(500).json({
	            message: 'database error',
	            error: err
		    });
		}).catch((err) => {
			return res.status(500).json({
	            message: 'database error',
	            error: err
		    });
		});
	}).catch((err) => {
		res.status(500).json({
            message: 'database error',
            error: err
	    });
	});
};

module.exports = events;