var MessagesStore = require('../../app/server/messages_store').MessagesStore;

module.exports = {
  'is defined': function(beforeExit, assert){
    assert.isDefined(MessagesStore);
  },

  '#messages': function(beforeExit, assert){
    var messages_store = new MessagesStore();

    messages_store.messages(function(messages) {
      assert.equal(messages.length, 0);
    });
  }
};
