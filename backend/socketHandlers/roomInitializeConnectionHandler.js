const roomInitializeConnectionHandler = (socket, data) => {
    const { connectedUserSocketId } = data;
    const initData = { connUserSocketId: socket.id};
    socket.to(connectedUserSocketId).emit('conn-init', initData);
};

module.exports = roomInitializeConnectionHandler;