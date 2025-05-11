const FriendInvitation = require('../../models/friendInvitation');
const friendsUpdates = require('../../socketHandlers/updates/friends')


const postReject = async (req, res) => {
    try {
        const { id } = req.body;
        const { userId } = req.user;

        // remove invitation from the friend invitations
        const invitationExist = await FriendInvitation.exists({_id: id});
        if (invitationExist) {
            await FriendInvitation.findByIdAndDelete(id);
        }

        // update pending invitations
        await friendsUpdates.updateFriendPendingInvitation(userId);

        return res.status(200).send('Invitation rejected');

    } catch (err) {
        console.log(err);
        return res.status(500).send('Something went wrong, try later');
    }
};

module.exports = postReject;