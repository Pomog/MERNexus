const jwt = require('jsonwebtoken');
const config = process.env;

const verifyToken = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['authorization'];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        token = token.replace(/^Bearer\s+/, "");
        req.user = jwt.verify(token, config.TOKEN_KEY);
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }

    return next();
}

module.exports = verifyToken;