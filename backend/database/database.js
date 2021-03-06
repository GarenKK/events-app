/*global require, exports, setInterval, clearInterval*/
'use strict';

var conf = require('../conf.js'),
    nano = require('nano')(conf.nano.url),
    timeout = conf.nano.timeout,
    db,
    setCookie,
    authorize,
    resetInterval,
    interval,
    database = {};

setCookie = function (cookie) {
    nano = require('nano')({
        url: conf.nano.url,
        cookie: cookie
    });
    db = nano.db.use(conf.nano.db);
};

authorize = function () {
    nano.auth(conf.nano.user, conf.nano.pass, function(error, body, headers) {
        if (error) {
            throw new Error(error);
        }
        if (headers && headers['set-cookie']) {
            setCookie(headers['set-cookie'][0]);
        }
    });
};

resetInterval = function (headers) {
    if (headers && headers['set-cookie']) {
        clearInterval(interval);
        setCookie(headers['set-cookie'][0]);
        interval = setInterval(authorize, timeout);
    }
};

database.view = function (designDoc, viewName, params) {
    // nano bug doesnt allow db.view to return promise while having callback in some environments
    return new Promise(function (resolve, reject) {
        db.view(designDoc, viewName, params, function (err, body, headers) {
            resetInterval(headers);
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        });
    });
};

database.get = function (docId) {
    return new Promise(function (resolve, reject) {
        db.get(docId, function (err, body, headers) {
            resetInterval(headers);
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        });
    });
};

database.insert = function (body, id) {
    return new Promise(function (resolve, reject) {
        if (typeof id === 'string' || id instanceof String) {
            db.insert(body, id, function (err, body, headers) {
                resetInterval(headers);
                if (err) {
                    reject(err);
                } else {
                    resolve(body);
                }
            });
        } else {
            db.insert(body, function (err, body, headers) {
                resetInterval(headers);
                if (err) {
                    reject(err);
                } else {
                    resolve(body);
                }
            });
        }
    });
};

database.destroy = function (id, rev) {
    return new Promise(function (resolve, reject) {
        db.destroy(id, rev, function (err, body, headers) {
            resetInterval(headers);
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        });
    });
};

database.init = function() {
    authorize();
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(authorize, timeout);
};

module.exports = database;
