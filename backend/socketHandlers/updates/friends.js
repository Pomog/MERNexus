const User = require('../../models/user');
const FriendInvitation = require('../../models/friendInvitation');
const serverStore = require('../../serverStore');

const updateFriendPendingInvitation = async (userId) => {
    try {
        // TODO: we can get the password with populate
        const pendingInvitations = await FriendInvitation.find({
            receiverId: userId
        }).populate('senderId', '_id username mail');


    } catch (err) {
        console.log(err);
    }
};