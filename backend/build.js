/*global require, console*/
'use strict';
var fs = require('fs'),
    conf = require('./conf.js'),
    nano = require('nano')(conf.nano.url);

var getViews = function (path) {
    var design = {};

    fs.readdirSync(path).forEach(function (fileName) {
        if (fileName.split('.')[fileName.split('.').length - 1] !== 'js') {
            return;
        }
        var name = fileName.slice(0, -3).split(' ');

        if (name.length !== 3) {
            return;
        }
        if (!design[name[0]]) {
            design[name[0]] = {
                '_id': '_design/' + name[0],
                language: 'javascript',
                views: {}
            };
        }
        if (!design[name[0]].views[name[1]]) {
            design[name[0]].views[name[1]] = {};
        }
        design[name[0]].views[name[1]][name[2]] = require(path + fileName);
    });

    return design;
};

var getDocs = function (path) {
    var docs = [];

    fs.readdirSync(path).forEach(function (fileName) {
        if (fileName.split('.')[fileName.split('.').length - 1] !== 'js') {
            return;
        }
        docs.push(require(path + fileName));
    });

    return docs;
};

var create = function (dbName) {
    nano.db.create(dbName, function () {
        var db = nano.use(dbName),
            views = getViews(conf.build.viewsPath),
            docs = getDocs(conf.build.docsPath),
            bulkDocs = [],
            key;

        for (key in views) {
            if (views.hasOwnProperty(key)) {
                bulkDocs.push(views[key]);
            }
        }
        for (key in docs) {
            if (docs.hasOwnProperty(key)) {
                bulkDocs.push(docs[key]);
            }
        }

        db.bulk({docs: bulkDocs}, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Created Successfully");
            }
        });
    });
};

nano.auth(conf.nano.user, conf.nano.pass, function (err, body, headers) {
    if (err) {
        console.log(err);
    }
    if (headers && headers['set-cookie']) {
        var dbName = conf.nano.db;
        nano = require('nano')({
            url: conf.nano.url,
            cookie: headers['set-cookie'][0]
        });
        if (process.argv.indexOf('--clean') !== -1) {
            console.log('delete and rebuild db:', dbName);
            nano.db.destroy(dbName, function () {
                create(dbName);
            });
        } else {
            console.log('build db:', dbName);
            create(dbName);
        }
    }
});
