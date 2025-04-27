const { Server } = require('socket.io');
const authSocket = require('./middleware/authSocket');
const newConnectionHandler = require("./socketHandlers/newConnectionHandler");
const {disconnect} = require("mongoose");
const disconnectHandler = require("./socketHandlers/disconnectHandler");
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

    io.on('connection', async (socket) => {
        try {
            await newConnectionHandler(socket, io);
            socket.on('disconnect', () => {
                disconnectHandler(socket);
            })
        } catch (err) {
            console.error('newConnectionHandler failed:', err);
        }
    });
};

module.exports = {
    registerSocketServer,
};