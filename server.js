// TODO: нужно использовать volatile для гарантированной доставки

var app = require('express').createServer()
  , io = require('socket.io').listen(app);

app.listen(3000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  socket.on('message', function(data) {
    socket.broadcast.emit('message', data); // send message to all other clients
  });
});
