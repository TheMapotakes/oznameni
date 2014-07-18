/**
 * GET /
 * Home page.
 */
var geoip = require('geoip-lite');

exports.index = function(req, res) {
  res.render('home', {
    title: 'Home',
    geo_location: geoip.lookup(req.connection.remoteAddress)
  });
};
