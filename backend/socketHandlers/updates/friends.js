const User = require('../../models/user');
const FriendInvitation = require('../../models/friendInvitation');
const serverStore = require('../../serverStore');

const updateFriendPendingInvitation = async (userId) => {
    console.log('updateFriendPendingInvitation');
    try {
        const io = serverStore.getSocketServerInstance();
        if (!io) {
            console.log('[friends] socket server instance not ready yet');
            return;
        }

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

        receiverList.forEach((receiverSocketId) => {
            io.to(receiverSocketId).emit('friends-invitations', {
                pendingInvitations: pendingInvitations ? pendingInvitations : []
            });
        });
    } catch (err) {
        console.log(err);
    }
};

const updateFriends = async (userId) => {
    try {
        // find active connections
        const receiverList = serverStore.getActiveConnections(userId);

        if (receiverList.length < 1) {
            return;
        }

        const user = await User.findById(userId, {_id: 1, friends: 1}).populate('friends', '_id userName mail');

        const user2 = await User.findById(userId);
        console.log("user2");
        console.log(user2);

        if (user) {
            const friendsList = user.friends.map(f => {
                return {
                    id: f._id,
                    mail: f.mail,
                    username: f.userName,
                };
            });


            console.log("user");
            console.log(user);
            console.log("friendsList");
            console.log(friendsList);

            const io = serverStore.getSocketServerInstance();

            receiverList.forEach(receiverSocketId => {
                io.to(receiverSocketId).emit("friends-list", {
                    friends: friendsList ? friendsList : [],
                });
            });
        }

    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    updateFriendPendingInvitation,
    updateFriends,
};