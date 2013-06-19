## express-cloudfiles-cdn

An example Express web application using Grunt and Grunt-Cloudfiles to upload static assets to Rackspace CDN enabled Cloud Files containers.

### Setup

Make sure you edit `src/config.json` with your API credentials and preferred container name.

```JSON
{
    "rackspace": {
        "username": "your-user-name",
        "apiKey": "your-api-key",
        "region": "DFW"
    },
    "container": "website",
    "environment": "@@environment"
}
```

The following grunt commands are enabled:

* grunt build
* grunt build:prod
* grunt publish

In the case of `grunt publish`, it will run `grunt build:prod` and then publish the assets in `src/public/css`, `src/public/js` and `src/public/img` to the Cloud Files container specified in `src/config.json`.