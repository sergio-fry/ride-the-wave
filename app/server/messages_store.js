var Db = require('mongodb').Db,
  Connection = require('mongodb').Connection,
  Server = require('mongodb').Server;


var MessagesStore = function() {
  var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
  var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;

  console.log("Connecting to " + host + ":" + port);

  this.db = new Db('node-mongo-examples', new Server(host, port, {}));


}

MessagesStore.prototype.messages = function(callback) {
  this.db.open(function(err, db) {
    console.log("db");
    callback([]);
  });
}

exports['MessagesStore'] = MessagesStore;
