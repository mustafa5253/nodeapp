module.exports = function(io) {

    var app = require('express');

    var router = app.Router();

    io.on('connection', function(socket) {

      console.log('A connection is made...', socket.id);

      socket.on('sendMessage', function (data) {
         socket.emit('newMessage', { hello: 'world' });
         console.log(data);
      });

    });

    return router;
}