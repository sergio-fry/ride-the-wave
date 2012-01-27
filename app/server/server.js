// TODO: нужно использовать volatile для гарантированной доставки

var app = require('express').createServer()
  , io = require('socket.io').listen(app);

var MessagesStore = require('./messages_store').MessagesStore;

app.listen(3000);

app.get('/', function (req, res) {
  console.log(__dirname);
  res.sendfile(__dirname + '/../client/index.html');
});

var messages_store = new MessagesStore();

io.sockets.on('connection', function (socket) {
  socket.on('set nickname', function (name) {
    socket.set('nickname', name, function () { socket.emit('ready'); });
  });

  socket.on('message', function(message) {
    socket.get('nickname', function (err, name) {
      messages_store.insert_message(name + ':' + message);
      socket.broadcast.emit('message', messages[messages.length - 1]); // send message to all other clients
    });
  });

  // send history to a just connected user
  for(var i=0; i<messages.length; i++) {
    socket.emit('message', messages[i]);
  }
});
