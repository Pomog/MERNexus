const roomInitializeConnectionHandler = (socket, data) => {
    const { connUserSocketID } = data;
    const initData = { connUserSocketID: socket.id};
    socket.to(connUserSocketID).emit('conn-init', initData);
};

module.exports = roomInitializeConnectionHandler;