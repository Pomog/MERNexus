const jwt = require('jsonwebtoken');

const config = process.env;

const verifyTokenSocket = (socket, next) => {
    const token =
        socket.handshake.auth?.token;

    try {
        socket.user = jwt.verify(token, config.TOKEN_KEY);
    } catch (err) {
        const socketError = new Error('NOT_AUTHORIZED');
        return next(socketError);
    }

    next();
}

module.exports = verifyTokenSocket;