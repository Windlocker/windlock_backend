var mongoose = require('mongoose');
var name = require('../package.json');

//it will connect to localhost/projectname

var db = mongoose.connect('mongodb://localhost/'+name.name);
mongoose.Promise = global.Promise;

var UsersSchema = mongoose.Schema({
  id: {type: String},
  passwd: {type: String},
  name: {type: String},
  token: {type: String},
  open: {type: Number, default: 0},
  ssid: {type: String},
  device_name: {type: String},
  pincode: {type: String},
  restore_key: {type: String},
  auth_token: {type: String},
  is_cert: {type: Boolean, default: 0}
});

exports.Users = mongoose.model("users", UsersSchema);
exports.db = db;
