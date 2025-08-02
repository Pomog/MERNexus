const serverStore = require( "../serverStore");
const roomUpdates = require("./updates/rooms");

const roomLeaveHandler = (socket, data) => {
    const { roomToLeave } = data;

    const activeRoom = serverStore.getActiveRoom(roomToLeave);

    if(activeRoom) {
        serverStore.leaveActiveRoom(roomToLeave, socket.id);
        const updatedActiveRoom = serverStore.getActiveRoom(roomToLeave);

        if (updatedActiveRoom) {
            updatedActiveRoom.participants.forEach(participant => {
                socket.to(participant.socketId).emit('room-participant-left', {
                    connUserSocketID: socket.id,
                });
            });
        }

        roomUpdates.updateRooms();
    }
};

module.exports = roomLeaveHandler;