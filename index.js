const express = require('express');
const app = express();
const path = require('path');

const SocketIO = require('socket.io');

// settings
app.set('port', process.env.PORT || 3000);

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(app.get('port'), () => {
    console.log('Listening on port ', app.get('port'));
});

// websockets
const io = SocketIO.listen(server);
io.on('connection', (socket) => {
    console.log('New Connection', socket.id);

    socket.on('chat:message', data =>{
        io.sockets.emit('chat:message', data);
    })

    socket.on('chat:typing', data => {
        socket.broadcast.emit('chat:typing', data);
    })
})