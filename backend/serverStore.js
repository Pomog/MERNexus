const connectedUsers = new Map();

const addNewConnectedUser = ({ socketId, usersId }) => {
    connectedUsers.set(socketId, usersId);
    console.log('connectedUsers');
    console.log(connectedUsers);
};

module.exports = {
    addNewConnectedUser,
}