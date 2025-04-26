const { Server } = require('socket.io');
const authSocket = require('./middleware/authSocket');
const registerSocketServer = (server) => {
    const io =
        new Server(server, {
        cors:{
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.use((socket, next) => {
        authSocket(socket, next);
    });

    io.on('connection', (socket) => {
        console.log('user connected');
        console.log(socket.id);

        // new connection Handler

    });
};

module.exports = {
    registerSocketServer,
};