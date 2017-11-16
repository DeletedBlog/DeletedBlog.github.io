var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('join', function(room){
    if (joinedroom != undefined){
      socket.leave(joinedroom);
    }
    socket.join(room);
    joinedroom = room;
  });
  socket.on('chat message', function(msg){
    io.to(joinedroom).emit('chat message', msg);
  });
  socket.on('username', function(usnm){
    io.to(joinedroom).emit('username', usnm);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
