const {Server} = require('socket.io');
const authSocket = require('./middleware/authSocket');
const newConnectionHandler = require("./socketHandlers/newConnectionHandler");
const {disconnect} = require("mongoose");
const disconnectHandler = require("./socketHandlers/disconnectHandler");
const {getSocketServerInstance, setSocketServerInstance, getOnlineUsers} = require("./serverStore");
const directMessageHandler = require("./socketHandlers/directMessageHandler");
const directChatHistoryHandler = require("./socketHandlers/directChatHistoryHandler");
const roomCreateHandler = require("./socketHandlers/roomCreateHandler");
const roomJoinHandler = require("./socketHandlers/roomJoinHandler");
const roomLeaveHandler = require("./socketHandlers/roomLeaveHandler");
const roomInitializeConnectionHandler = require("./socketHandlers/roomInitializeConnectionHandler");
const roomSignalingDataHandler = require("./socketHandlers/roomSignalingDataHandler");
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

                emitOnlineUsers();

                socket.on('direct-message', (data) => {
                    directMessageHandler(socket, data);
                });

                socket.on('direct-chat-history', (data) => {
                    directChatHistoryHandler(socket, data);
                });

                socket.on('disconnect', () => {
                    disconnectHandler(socket);
                });

                socket.on('room-create', () => {
                    roomCreateHandler(socket);
                });

                socket.on('room-join', (data) => {
                    roomJoinHandler(socket, data);
                });

                socket.on('room-leave', (data) => {
                    console.log('room-leave');
                    console.log(data);

                    roomLeaveHandler(socket, data);
                });

                socket.on('conn-init', (data) => {
                    console.log('conn-init');
                    console.log(data);
                    roomInitializeConnectionHandler(socket, data);
                });

                socket.on('conn-signal', data => {
                    console.log('conn-signal');
                    console.log(data);
                   roomSignalingDataHandler(socket, data);
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