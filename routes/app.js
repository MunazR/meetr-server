var mongo = require('mongodb');

var Server = mongo.Server,
  Db = mongo.Db,
  BSON = mongo.BSONPure;

db = new Db('meetr', server);

var server = new Server('localhost', 27017, {
  auto_reconnect: true
});

db.open(function(err, db) {
  if (!err) {
    console.log("Connected to 'meetr' database");
  }
});


exports.getHealth = function(req, res) {
  res.send(200, {
    server: "OK"
  });
};
