// TODO: нужно использовать volatile для гарантированной доставки

var express = require('express')
  , app = require('express').createServer()
  , io = require('socket.io').listen(app);

var MessagesStore = require('./messages_store').MessagesStore;

app.listen(3000);
app.configure(function(){
  app.use(express.static(__dirname + '/../client'));
});

app.get('/', function (req, res) {
  res.sendfile('/index.html');
});

var messages_store = new MessagesStore();

io.sockets.on('connection', function (socket) {
  socket.on('set nickname', function (name) {
    socket.set('nickname', name, function () { socket.emit('ready'); });
  });

  socket.on('message', function(message) {
    socket.get('nickname', function (err, name) {
      messages_store.insert_message(name + ':' + message, function() {
        socket.broadcast.emit('message', name + ':' + message); // send message to all other clients
      });
    });
  });

  // send history to a just connected user
  messages_store.messages(function(messages) {
    for(var i=0; i<messages.length; i++) {
      socket.emit('message', messages[i].body);
    }
  });
});
