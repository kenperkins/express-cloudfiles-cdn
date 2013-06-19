var config = require('./config.json'),
    pkgcloud = require('pkgcloud');

var currentConfiguration = {};

exports.initialize = function(callback) {

    currentConfiguration = config;

    if (currentConfiguration.environment === 'prod') {
        var client = pkgcloud.providers.rackspace.storage.createClient({
            username: currentConfiguration.rackspace.username,
            apiKey: currentConfiguration.rackspace.apiKey,
            region: currentConfiguration.rackspace.region
        });

        client.getContainer(currentConfiguration.container, function(err, container) {
            if (err) {
                return callback(err);
            }

            currentConfiguration.uriPrefix = container.cdnUri;

            callback();
        });

        return;
    }

    currentConfiguration.uriPrefix = '';
    process.nextTick(callback);
};

exports.getConfig = function() {
    return currentConfiguration;
}

