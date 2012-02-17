//TODO: If performance is critical for your app, we strongly recommend installing the optional bson_ext gem.

var Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    connect = require('mongodb').connect,
    Server = require('mongodb').Server;

var mongo_uri = process.env.MONGOHQ_URL || process.env.MONGOLAB_URI;

var MessagesStore = function() {

}
MessagesStore.prototype._connect = function(callback) {
  if(mongo_uri != undefined) {
    connect(mongo_uri, callback);
  } else {

    console.log(Connection.DEFAULT_PORT);
    var db = new Db('ride-the-wave-test1', new Server("localhost", Connection.DEFAULT_PORT, {}));
    db.open(callback);
  }
}

MessagesStore.prototype.clear = function(callback) {
  this._connect(function(err, db) {
    if (err) throw err;
    db.collection("messages", function(err, collection) {
      if (err) throw err;
      collection.drop(function(err, collection) {
        if (err) throw err;
        db.close(function() {
          callback();
        });
      });
    });
  });
}

MessagesStore.prototype.insert_message = function(message, callback) {
  this._connect(function(err, db) {
    if (err) throw err;

    db.collection('messages', function(err, collection) {
      if (err) throw err;

      message["created_at"] = new Date().getTime() / 1000;
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
  this._connect(function(err, db) {
    if (err) throw err;

    db.collection('messages', function(err, collection) {
      if (err) throw err;
      collection.find({}, function(err, cursor) {
        if (err) throw err;
        cursor.toArray(function(err, messages) {
          if (err) throw err;
          db.close(function() {
            callback(messages);
          });
        });
      });
    });
  });
}

exports['MessagesStore'] = MessagesStore;
