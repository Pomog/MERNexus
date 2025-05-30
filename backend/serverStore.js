const connectedUsers = new Map();

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

module.exports = {
    addNewConnectedUser,
    removeConnectedUser,
    getActiveConnections,
    setSocketServerInstance,
    getSocketServerInstance,
    getOnlineUsers,
}