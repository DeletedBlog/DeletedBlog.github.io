var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('join', function(room){
    if (socket.room != undefined) {
      if (socket.username != undefined) {
        io.sockets.in(socket.room).emit('chat message', socket.username + "has joined your channel");
      } else {
        io.sockets.in(socket.room).emit('chat message', "anonymous has joined your channel")
      }
      socket.leave(socket.room);
    }
    socket.join(room);
    socket.room = room;
    if (socket.username != undefined) {
      io.sockets.in(socket.room).emit('chat message', socket.username + "has joined your channel");
    } else {
      io.sockets.in(socket.room).emit('chat message', "anonymous has joined your channel")
    }
  });
  socket.on('chat message', function(msg){
    io.sockets.in(socket.room).emit('chat message', msg);
  });
  socket.on('username', function(usnm){
    socket.username = usnm;
    io.sockets.in(socket.room).emit('username', socket.username);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
