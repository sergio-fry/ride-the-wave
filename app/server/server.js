// TODO: нужно использовать volatile для гарантированной доставки

var express = require('express')
  , app = express.createServer()
  , io = require('socket.io').listen(app);

app.listen(3000);

app.configure(function(){
  app.use(express.static(__dirname + '/../client'));
});

app.get('/', function(req, res) {
  res.sendfile('/index.html');
});

//app.get('/', function (req, res) {
  //res.sendfile(__dirname + '../client/index.html');
//});

var messages = [];

io.sockets.on('connection', function (socket) {
  socket.on('set nickname', function (name) {
    socket.set('nickname', name, function () { socket.emit('ready'); });
  });

  socket.on('message', function(message) {
    socket.get('nickname', function (err, name) {
      messages.push(name + ':' + message);
      socket.broadcast.emit('message', messages[messages.length - 1]); // send message to all other clients
    });
  });

  // send history to a just connected user
  for(var i=0; i<messages.length; i++) {
    socket.emit('message', messages[i]);
  }
});
