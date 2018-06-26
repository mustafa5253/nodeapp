module.exports = function(io) {

    var app = require('express');

    var router = app.Router();

    io.on('connection', function(socket) {

      console.log('A connection is made...', socket.id);

      socket.on('join', function (data) {
        console.log("---- data.company is :", data.company);
        socket.join(data.company); // We are using room of socket io
      });

      socket.on('disconnect', function (data) {
        console.log('User is disconnected ', data);
      });

      socket.on('sendMessage', function (data) {
         socket.emit('newMessage', { hello: 'world' });
         console.log(data);
      });

    });

    return router;
}