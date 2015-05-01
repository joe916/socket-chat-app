var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + "/app"));

var router = express.Router();

router.post('/chat/create', function (req, res) {
  var name = req.body.name;
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(8000, function (){
	console.log('chat server listening on 8000');
});