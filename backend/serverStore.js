const { v4: uuidv4 } = require('uuid');

const connectedUsers = new Map();
let activeRooms = [];



let io = null;

const setSocketServerInstance = (ioInstance) => {
    io = ioInstance;
};

const getSocketServerInstance = () => {
    return io;
}


const addNewConnectedUser = ({socketId, userId}) => {
    connectedUsers.set(socketId, {userId});
    console.log('connectedUsers');
    console.log(connectedUsers);
};

const removeConnectedUser = (socketId) => {
    if (connectedUsers.has(socketId)) {
        connectedUsers.delete(socketId);
        console.log('new connected users');
        console.log(connectedUsers);
    }
}

const getActiveConnections = (userId) => {
    const activeConnections = [];

    connectedUsers.forEach(function (value, key) {
        console.log('value');
        console.log(value);
        console.log('key');
        console.log(key);
        if (value.userId === userId) {
            activeConnections.push(key);
        }
    });

    console.log("activeConnections");
    console.log(activeConnections);

    return activeConnections;
};

const getOnlineUsers = () => {
    const onlineUsers = [];

    connectedUsers.forEach((value, key) => {
        onlineUsers.push({socketId: key, userId: value.userId});
    });

    return onlineUsers;
};

const addNewActiveRoom = (userId, socketId) => {
    const newActiveRoom = {
        roomCreator: {
            userId,
            socketId,
        },
        participants: [
            {
                userId,
                socketId,
            },
        ],
        roomId: uuidv4(),
    };

    activeRooms = [...activeRooms, newActiveRoom];
    console.log('activeRooms');
    console.log(activeRooms);

    return newActiveRoom;
};

const getActiveRooms = () => {
    return[...activeRooms];
};

module.exports = {
    addNewConnectedUser,
    removeConnectedUser,
    getActiveConnections,
    setSocketServerInstance,
    getSocketServerInstance,
    getOnlineUsers,
    addNewActiveRoom,
    getActiveRooms,
};