//TODO: If performance is critical for your app, we strongly recommend installing the optional bson_ext gem.

var Db = require('mongodb').Db,
  Connection = require('mongodb').Connection,
  connect = require('mongodb').connect,
  Server = require('mongodb').Server;

var mongo_uri = process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || "mongodb://ridethewave:ridethewave12345@ds029847.mongolab.com:29847/ride-the-wave";
//var mongo_uri = "mongodb://ridethewave:ridethewave12345@ds029847.mongolab.com:29847/ride-the-wave";

var MessagesStore = function() {

}

MessagesStore.prototype.clear = function(callback) {
  connect(mongo_uri, function(err, db) {
    if (err) console.log(err);
    db.collection("messages", function(err, collection) {
      if (err) console.log(err);
      collection.drop(function(err, collection) {
        if (err) console.log(err);
        db.close(function() {
          callback();
        });
      });
    });
  });
}

MessagesStore.prototype.insert_message = function(message, callback) {
  connect(mongo_uri, function(err, db) {
    if (err) console.log(err);

    db.collection('messages', function(err, collection) {
      if (err) console.log(err);

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
  connect(mongo_uri, function(err, db) {
    if (err) console.log(err);

    db.collection('messages', function(err, collection) {
      if (err) console.log(err);
      collection.find({}, function(err, cursor) {
        if (err) console.log(err);
        cursor.toArray(function(err, messages) {
          if (err) console.log(err);
          db.close(function() {
            callback(messages);
          });
        });
      });
    });
  });
}

exports['MessagesStore'] = MessagesStore;
