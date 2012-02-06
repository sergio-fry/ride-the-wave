// TODO: нужно использовать volatile для гарантированной доставки

var express = require('express')
  , app = express.createServer()
  , io = require('socket.io').listen(app);

var MessagesStore = require('./messages_store').MessagesStore;

var port = process.env.PORT || 3000;
app.listen(port);
app.configure(function(){
  app.use(express.static(__dirname + '/../client'));
});

app.get('/', function (req, res) {
  res.sendfile('/index.html');
});

var messages_store = new MessagesStore();

// Force long pollingon heroku
io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});

io.sockets.on('connection', function (socket) {
  socket.on('set nickname', function (name) {
    socket.set('nickname', name, function () { socket.emit('ready'); });
  });

  socket.on('message', function(message_body) {
    socket.get('nickname', function (err, name) {
      var message = { "name": name, "body": message_body }
      messages_store.insert_message(message, function() {
        socket.broadcast.emit('message', message); // send message to all other clients
      });
    });
  });

  // send history to a just connected user
  messages_store.messages(function(messages) {
    for(var i=0; i<messages.length; i++) {
      socket.emit('message', messages[i]);
    }
  });
});
