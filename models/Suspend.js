var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({

  raw_text: String,
  type: String,

  created_at: Date,
  from: Date,
  to: Date,

  region: String,
  locality: String,
  street: String,
  house_number: String
});

module.exports = mongoose.model('Suspend', userSchema);
