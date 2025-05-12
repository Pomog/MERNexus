const FriendInvitation = require('../../models/friendInvitation');
const User = require('../../models/user');
const friendsUpdates = require('../../socketHandlers/updates/friends');
const postAccept = async (req, res) => {
    try {
        const { id } = req.body;
        const invitation = await  FriendInvitation.findById(id);

        if (!invitation) {
            return res.status(401).send('Error, try later');
        }

        const { senderId, receiverId } = invitation;

        // add friends to the both users
        const senderUser = await User.findById(senderId);
        senderUser.friends = [...senderUser.friends, receiverId];

        const receiverUser = await User.findById(receiverId);
        receiverUser.friends = [...receiverUser.friends, senderId];

        await senderUser.save();
        await receiverUser.save();

        // delete invitation
        await FriendInvitation.findByIdAndDelete(id);

        // update list if users are online
        await friendsUpdates.updateFriendPendingInvitation(receiverId.toString());

        return res.status(200).send('Friend successfully added');


    } catch (err) {
        console.log(err);
        return res.status(500).send('Something went wrong, try later');
    }

};

module.exports = postAccept;