const serverStore = require( "../serverStore");
const roomUpdates = require("./updates/rooms");

const roomJoinHandler = (socket, data) => {
    const { roomId } = data;

    const participantDetails = {
        userId: socket.user.userId,
        socketId: socket.id,
    };

    const roomDetails = serverStore.getActiveRoom(roomId);
    console.log("roomDetails from roomJoinHandler");
    console.log(roomDetails);

    serverStore.joinActiveRoom(roomId, participantDetails);

    roomDetails.participants.forEach((participant) => {
        console.log("participant");
        console.log(participant);
        if (participant.socketId !== participantDetails.socketId) {
            socket.to(participant.socketId).emit('conn-prepare', {
                connUserSocketID: participantDetails.socketId,
            });
        }
    });

    roomUpdates.updateRooms();
};

module.exports = roomJoinHandler;