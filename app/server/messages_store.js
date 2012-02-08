var Db = require('mongodb').Db,
  Connection = require('mongodb').Connection,
  Server = require('mongodb').Server;


var MessagesStore = function() {
  mongolab_uri = "mongodb://heroku_app2782235:tjjf44se0h9rhp6t3v4n4ppcrj@ds029837.mongolab.com:29837/heroku_app2782235";
  var mongolab_uri_parts = mongolab_uri.match(/mongodb:\/\/(.*):(.*)@(.*):(.*)\/(.*)/);
  var username = mongolab_uri_parts[1];
  var password = mongolab_uri_parts[2];
  var host = mongolab_uri_parts[3];
  var port = parseInt(mongolab_uri_parts[4]);
  var database = mongolab_uri_parts[5];

  //var host = mongolab_uri.match(/mongodb:\/\/(.*)/)[1]

  //var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
  //var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;

  //console.log("Connecting to " + mongolab_uri_parts);

  console.log(host, port);
  //this.db = new Db(database, new Server(host, port, { username: username, password: password }));
  this.db = new Db(database, new Server(host, port));
}

MessagesStore.prototype.clear = function(callback) {
  this.db.open(function(err, db) {
    db.collection("messages", function(err, collection) {
      collection.drop(function(err, collection) {
        db.close(function() {
          callback();
        });
      });
    });
  });
}

MessagesStore.prototype.insert_message = function(message, callback) {
  this.db.open(function(error, db) {
    if (error) throw error;

    db.collection('messages', function(err, collection) {
      // TODO: created_at = new Date().getTime() / 1000
      collection.insert(message, function(docs) {
        db.close(function() {
          callback(docs);
        });
      });
    });
  });
}

// fetch messages
MessagesStore.prototype.messages = function(callback) {
  this.db.open(function(err, db) {
    if (err) throw err;

    db.collection('messages', function(err, collection) {
      collection.find({}, function(err, cursor) {
        cursor.toArray(function(err, messages) {
          db.close(function() {
            callback(messages);
          });
        });
      });
    });
  });
}

exports['MessagesStore'] = MessagesStore;
