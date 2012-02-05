var async = require("async");

var MessagesStore = require('../../app/server/messages_store').MessagesStore;

var beforeEach = function(callback) {
  var messages_store = new MessagesStore();
  messages_store.clear(function(){
    callback(messages_store);
  });
}

module.exports = {
  'is defined': function(beforeExit, assert) {
    assert.isDefined(MessagesStore);
  },


  '#messages': function(beforeExit, assert) {
    beforeEach(function(messages_store) {
      async.series([function() { // messages should be empty
        messages_store.messages(function(messages) {
          assert.equal(messages.length, 0);
        });
      }, function() { // should be possible to insert message
        messages_store.insert_message({ "name": "Foo", "body": "dummy message" }, function(error) {
          messages_store.messages(function(messages) {
            assert.equal(messages.length, 1);
          });
        });
      }]);
    });
  }
};
