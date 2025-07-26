const roomInitializeConnectionHandler = (socket, data) => {
    const { connUserSocketID } = data;
    const initData = { connUserSocketID: socket.id};
    console.log("initData");
    console.log(initData);
    socket.to(connUserSocketID).emit('conn-init', initData);
};

module.exports = roomInitializeConnectionHandler;