const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const postRegister = async (req, res) => {
    //res.send('register route');
    try {
        const { userName: userName, mail, password } = req.body;
        console.log(userName);
        console.log(mail);
        console.log(password);

        // check - user exist
        const userExist = await User.exists({ mail });
        console.log("userExist");
        console.log(userExist);

        if (userExist) {
            return res.status(409).send('e-mail already in use');
        }

        // encrypt the password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // create and save user document
        const user = await User.create({
            userName: userName,
            mail: mail.toLowerCase(),
            password: encryptedPassword
        })

        // create JWT token
        const token = jwt.sign(
            {
            userId: user._id,
            mail },
            process.env.TOKEN_KEY,
            {
                expiresIn: "24h",
            }
        );

        res.status(201).json({
            userDetails: {
                username: user.userName,
                mail: user.mail,
                token: token,
                _id: user._id,
            }
        });

    } catch (err) {
        return res.status(500).send("Try again later" + err);
    }
};

module.exports = postRegister;