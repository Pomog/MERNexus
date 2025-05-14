const {addNewConnectedUser} = require("../serverStore");
const {updateFriendPendingInvitation, updateFriends} = require("./updates/friends");
const newConnectionHandler = async (socket, io) => {
    const userDetails = socket.user;

    addNewConnectedUser({
        socketId: socket.id,
        userId: userDetails.userId,
    });

    // update pending friends invitations list
    await updateFriendPendingInvitation(userDetails.userId);

    // update friends list
    await updateFriends(userDetails.userId);
};

module.exports = newConnectionHandler;