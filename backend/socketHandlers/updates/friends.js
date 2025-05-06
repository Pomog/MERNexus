const User = require('../../models/user');
const FriendInvitation = require('../../models/friendInvitation');
const serverStore = require('../../serverStore');

const updateFriendPendingInvitation = async (userId) => {
    console.log('updateFriendPendingInvitation');
    try {
        // TODO: we can get the password with populate
        const pendingInvitations = await FriendInvitation.find({
            receiverId: userId
        }).populate('senderId', '_id username mail');
        console.log('pendingInvitations');
        console.log(pendingInvitations);

        // get all active connections if the user
        const receiverList = serverStore.getActiveConnections(userId);
        console.log('getActiveConnections(userId);');
        console.log(userId);
        console.log('receiverList');
        console.log(receiverList);

        const io = serverStore.getSocketServerInstance();
        if (!io) {
            console.log('[friends] socket server instance not ready yet');
            return;
        }

        receiverList.forEach((receiverSocketId) => {
            io.to(receiverSocketId).emit('friends-invitations', {
                pendingInvitations: pendingInvitations ? pendingInvitations : []
            });
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    updateFriendPendingInvitation,
};