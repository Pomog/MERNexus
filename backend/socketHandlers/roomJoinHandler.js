const serverStore = require( "../serverStore");
const roomUpdates = require("./updates/rooms");

const roomJoinHandler = (socket, data) => {
    const { roomId } = data;

    const participantDetails = {
        userId: socket.user.userId,
        socketId: socket.id,
    };

    const roomDetails = serverStore.getActiveRoom(roomId);

    serverStore.joinActiveRoom(roomId, participantDetails);

    roomDetails.participants.forEach((participant) => {
        if (participant.socketId !== participantDetails.socketId) {
            socket.to(participant.socketId).emit('conn-prepare', {
                connUserSocketID: participantDetails.socketId,
            });
        }
    });

    roomUpdates.updateRooms();
};

module.exports = roomJoinHandler;