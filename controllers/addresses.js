/**
 * GET addresses/region/
 */
var pg = require('pg');
var conString = "postgres://bumbu:password@localhost/sistari";

var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  console.log('client connected to postgres')
});

function searchFor(req, res, tableName) {
  var q = req.query.q || ''
    , parent_id = parseInt(req.query.parent_id, 10) || 0
    , query = 'SELECT * FROM ' + tableName
    , wheres = []

  q = q.replace(/[^a-z0-9\s]/gi,'').toLowerCase()

  if (q !== '') {
    wheres.push("lower(title) LIKE '%" + q + "%'")
  }
  if (parent_id > 0) {
    wheres.push("parent_id = " + parent_id)
  }

  if (wheres.length) {
    query += " WHERE " + wheres.join(' AND ')
  }

  client.query(query, function(err, result) {
    if (err) {
      res.json({
        message: 'error'
      })
    } else {
      res.json(result.rows.slice(0, 30))
    }
  })
}

exports.region = function(req, res) {
  return searchFor(req, res, 'regions')
};

exports.locality = function(req, res) {
  return searchFor(req, res, 'localities')
};

exports.street = function(req, res) {
  return searchFor(req, res, 'streets')
};

exports.building = function(req, res) {
  return searchFor(req, res, 'buildings')
};
