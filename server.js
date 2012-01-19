// TODO: нужно использовать volatile для гарантированной доставки

var app = require('express').createServer()
  , io = require('socket.io').listen(app);

app.listen(3000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  socket.on('set nickname', function (name) {
    socket.set('nickname', name, function () { socket.emit('ready'); });
  });

  socket.on('message', function(message) {
    socket.get('nickname', function (err, name) {
      socket.broadcast.emit('message', name + ':' +message); // send message to all other clients
    });
  });
});
