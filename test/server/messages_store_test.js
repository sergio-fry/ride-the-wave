var MessagesStore = require('../../app/server/messages_store').MessagesStore;

module.exports = {
  'is defined': function(beforeExit, assert) {
    assert.isDefined(MessagesStore);
  },

  '#insert_messages': function(beforeExit, assert) {
    var messages_store = new MessagesStore();

    messages_store.insert_message("dummy message", function(error) {
      messages_store.messages(function(messages) {
        assert.equal(messages.length, 1);
      });
    });
  },

  '#messages': function(beforeExit, assert) {
    var messages_store = new MessagesStore();

    messages_store.messages(function(messages) {
      assert.equal(messages.length, 0);
    });
  }
};
