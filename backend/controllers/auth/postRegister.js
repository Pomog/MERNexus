const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const postRegister = async (req, res) => {
    //res.send('register route');
    try {
        const { username, mail, password } = req.body;

        // check - user exist
        const userExist = await User.exists({ mail });
        console.log(userExist);

        if (userExist) {
            return res.status(409).send('e-mail already in use');
        }

        // encrypt the password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // create and save user document
        const user = await User.create({
            username,
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
                username: user.username,
                mail: user.mail,
                token: token,
            }
        });

    } catch (err) {
        return res.status(500).send("Try again later");
    }
};

module.exports = postRegister;