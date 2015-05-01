var shortid = require('shortid');
var _ = require('underscore-node');

var currentChats = [];

exports.createChat = function (name, password) {
  var id = shortid.generate();
  var chat = {
    "id": id,
    "name": name,
    "participants": [],
    "password": password
  };
  currentChats.push(chat);
  return getChat(id);
};

exports.chats = function () {
  var chats = [];
  _.each(currentChats, function (item){
    var chat = clientChat(item);
    chats.push(chat);
  });
  return chats;
}

function getChat(id) {
  var chat = _.find(currentChats, function (item){
    return item.id === id;
  });
  return clientChat(chat);
};

function clientChat(chat) {
  var _chat = {
    "id": chat.id,
    "name": chat.name,
    "participantCount": chat.participants.length
  };
  return _chat;
}