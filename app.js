require('dotenv').config();
// const express = require('express');
// const app = express();
// Or
const app = require('express')();
const {Server} = require('socket.io');
const DBConnect = require('./database');

// *Database Connection
DBConnect();

const PORT = process.env.PORT 
const server = app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

const io = new Server(server);

io.on('connection', (socket) => {
//   console.log('Someone has connected: ', socket.id); 

//   socket.on('sendData', (data) => {
//     console.log('Data received: ', data);
// //     io.emit('sendData', data); // Broadcast the message to all connected clients
//   });

    socket.on('sendData', (data) => {
      if(data){
            // io.emit('sendData', data); // Broadcast the message to all connected clients

            // io.to(socket.id).emit('sendData', data); // Send the message back to the same client

            io.to(socket.id).emit('response', "Data received successfully"); // Send the message back to the same client

            // socket.emit("response", "Data received successfully"); // Send acknowledgment to the sender
      }
  });


      // socket.emit('msg', 'Hello from server!');
// Or
      // socket.emit('msg', {
      //     gretting : 'Hello from server!'
      // });
  
//   socket.on('disconnect', () => {
//     console.log('User was disconnected: ', socket.id);
//   });
});  



// *Send data from Frontend to Backend using Socket.io:
io.on('connection', (socket) => {
      // Listen for 'message' event from client
      socket.on('message', (data) => {
        console.log('Message from client:', data);
      });
})

// *Send data from Backend to Frontend using Socket.io:
io.on('connection', (socket) => {
      // Send a message to the client
      // socket.emit('msg', 'Hello from server!');

      // socket.emit('msg', {
      //     greeting : 'Hello from server1!'
      // });

      io.to(socket.id).emit('msg', 'Hello from server2!');
});
