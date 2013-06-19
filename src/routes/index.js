
/*
 * GET home page.
 */

var config = require('../config').getConfig();

exports.index = function(req, res) {
  res.render('index', { title: 'Express', prefix: config.uriPrefix || '' });
};