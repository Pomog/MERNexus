const User = require('../../models/user');
const FriendInvitation = require('../../models/friendInvitation');
const friendsUpdates = require('../../socketHandlers/updates/friends');
const postInvite = async (req, res) => {
    const {targetMailAddress} = req.body;
    const {userId, mail} = req.user;

    console.log('REQ.BODY:', req.body);
    console.log('REQ.USER:', req.user);

    if (mail.toLowerCase() === targetMailAddress.toLowerCase()) {
        return res
            .status(409)
            .send('Can not become friend with yourself');
    }

    const targetUser = await User.findOne({
        mail: targetMailAddress.toLowerCase(),
    });

    console.log("Found User");
    console.log(targetUser);

    if (!targetUser) {
        return res
            .status(404)
            .send(`Friend of ${targetMailAddress} has not been found`);
    }


    const invitationAlreadyReceived =
        await FriendInvitation.findOne({
            senderId: userId,
            receiverId: targetUser._id,
        })

    if (invitationAlreadyReceived) {
        return res
            .status(409)
            .send('Invitation has been already sent');
    }

    const userAlreadyFriend = targetUser.friends.find(
        (friendId) => friendId.toString() === userId.toString());

    if (userAlreadyFriend) {
        return res
            .status(409)
            .send('Friend already added');
    }

    const newInvitation = await FriendInvitation.create({
        senderId: userId,
        receiverId: targetUser._id,
    });

    // TODO: if inv created successfully ???

    // send pending invitations update
    await friendsUpdates.updateFriendPendingInvitation(targetUser._id.toString());

    return res.status(201).send('Information has been sent');
}

module.exports = postInvite;