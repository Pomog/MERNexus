const {addNewConnectedUser} = require("../serverStore");
const {updateFriendPendingInvitation} = require("./updates/friends");
const newConnectionHandler = async (socket, io) => {
    const userDetails = socket.user;

    addNewConnectedUser({
        socketId: socket.id,
        userId: userDetails.userId,
    });

    // update pending friends invitations list
    await updateFriendPendingInvitation(userDetails.userId);
};

module.exports = newConnectionHandler;