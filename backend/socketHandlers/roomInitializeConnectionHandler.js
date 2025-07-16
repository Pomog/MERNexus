const roomInitializeConnectionHandler = (socket, data) => {
    const { connectedUserSocketId } = data;
    const initData = { connUserSocketId: socket.id};
    console.log("initData");
    console.log(initData);
    socket.to(connectedUserSocketId).emit('conn-init', initData);
};

module.exports = roomInitializeConnectionHandler;