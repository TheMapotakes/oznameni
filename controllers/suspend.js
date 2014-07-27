
var Suspend = require('../models/Suspend');

exports.getFutureSuspends = function(req, res, next) {

  Suspend.find(req.query, function(err, suspends) {
    res.json(suspends)
  });

};
