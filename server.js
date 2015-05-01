var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

var chat_db = require('./private_modules/chat_db.js');

var router = express.Router();
app.use(bodyParser.json());
app.use('', router); // Adding Express router
app.use(express.static(__dirname + "/app"));

router.post('/chat/create', function (req, res) {
  var name = req.body.name;
  var password = req.body.password;
  var chat = chat_db.createChat(name, password);
  res.json(chat);
});

router.get('/chats', function (req, res) {
  res.json(chat_db.chats());
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(8000, function (){
	console.log('chat server listening on 8000');
});