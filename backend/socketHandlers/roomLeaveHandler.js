const serverStore = require( "../serverStore");
const roomUpdates = require("./updates/rooms");

const roomLeaveHandler = (socket, data) => {

    console.log("data");
    console.log(data);

    const { roomToLeave } = data;

    console.log("roomId");
    console.log(roomToLeave);

    const activeRoom = serverStore.getActiveRoom(roomToLeave);

    console.log("activeRoom");
    console.log(activeRoom);

    if(activeRoom) {
        serverStore.leaveActiveRoom(roomToLeave, socket.id);

        roomUpdates.updateRooms();
    }
};

module.exports = roomLeaveHandler;