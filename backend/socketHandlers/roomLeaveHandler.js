const serverStore = require( "../serverStore");
const roomUpdates = require("./updates/rooms");

const roomLeaveHandler = (socket, data) => {
    const { roomToLeave } = data;

    const activeRoom = serverStore.getActiveRoom(roomToLeave);

    if(activeRoom) {
        serverStore.leaveActiveRoom(roomToLeave, socket.id);

        roomUpdates.updateRooms();
    }
};

module.exports = roomLeaveHandler;