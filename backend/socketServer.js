const {Server} = require('socket.io');
const authSocket = require('./middleware/authSocket');
const newConnectionHandler = require("./socketHandlers/newConnectionHandler");
const {disconnect} = require("mongoose");
const disconnectHandler = require("./socketHandlers/disconnectHandler");
const {getSocketServerInstance, setSocketServerInstance, getOnlineUsers} = require("./serverStore");
const directMessageHandler = require("./socketHandlers/directMessageHandler");
const registerSocketServer = (server) => {
    const io =
        new Server(server, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST'],
            },
        });

    setSocketServerInstance(io);

    io.use((socket, next) => {
        authSocket(socket, next);
    });

    const emitOnlineUsers = () => {
        const onlineUsers = getOnlineUsers();
        io.emit('online-users', {onlineUsers});
    };

    io.on(
        'connection',
        async (socket) => {
            try {
                await newConnectionHandler(socket, io);
                socket.on('disconnect', () => {
                    disconnectHandler(socket);
                });
                emitOnlineUsers();

                socket.on('direct-message', (data) => {
                    directMessageHandler(socket, data);
                });

            } catch (err) {
                console.error('newConnectionHandler failed:', err);
            }
        });

    setInterval(() => {
        emitOnlineUsers();
    }, [1000 * 8]);
};

module.exports = {
    registerSocketServer,
};