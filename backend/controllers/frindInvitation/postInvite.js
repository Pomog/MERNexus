const User = require('../../models/user');
const postInvite = async (req, res) => {
    const { targetMailAddress } = req.body;
    console.log('REQ.BODY:', req.body);
    // console.log('REQ:', req);
    console.log('REQ.USER:', req.user);
    const { mail } = req.user;

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

    // TODO: check that invitation was sent already

    return res.send('Controller is working');
}

module.exports = postInvite;