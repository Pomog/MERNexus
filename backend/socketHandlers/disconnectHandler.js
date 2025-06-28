const serverStore = require('../serverStore');
const roomLeaveHandler = require("./roomLeaveHandler");

const disconnectHandler = (socket, data) => {
    const activeRooms = serverStore.getActiveRooms();

    activeRooms.forEach(activeRoom => {
        const userInRoom = activeRoom.participants.some(
            (participant) => participant.socketId === socket.id
        );

        if (userInRoom) {
            roomLeaveHandler(socket, { roomToLeave: activeRoom.roomId})
        }
    });

    serverStore.removeConnectedUser(socket.id);
}

module.exports = disconnectHandler;