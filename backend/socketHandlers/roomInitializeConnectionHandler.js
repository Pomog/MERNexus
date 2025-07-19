const roomInitializeConnectionHandler = (socket, data) => {
    const { connectedUserSocketID } = data;
    const initData = { connUserSocketID: socket.id};
    console.log("initData");
    console.log(initData);
    socket.to(connectedUserSocketID).emit('conn-init', initData);
};

module.exports = roomInitializeConnectionHandler;