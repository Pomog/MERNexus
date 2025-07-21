const roomSignalingDataHandler = (socket, data) => {
    console.log("The DATA came to roomSignalingDataHandler");
    console.log(data);

    const { connUserSocketID, signal } = data;

    const signalData = { signal, connUserSocketID: socket.id };
    socket.to(connUserSocketID).emit('conn-signal', signalData);
};

module.exports = roomSignalingDataHandler;