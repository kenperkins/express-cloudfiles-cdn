
/**
 * Module dependencies.
 */

var express = require('express'),
    app = express(),
    config = require('./config');

config.initialize(function(err) {

    if (err) {
        console.dir(err);
        process.exit(1);
    }

    var http = require('http'),
        routes = require('./routes'),
        user = require('./routes/user'),
        path = require('path'),
        pkgcloud = require('pkgcloud'),
        async = require('async');

    // all environments
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));

    // development only
    if (config.getConfig().environment === 'dev') {
        app.use(express.errorHandler());
    }

    app.get('/', routes.index);
    app.get('/users', user.list);

    http.createServer(app).listen(app.get('port'), function() {
        console.log('Express server listening on port ' + app.get('port'));
    });
});




