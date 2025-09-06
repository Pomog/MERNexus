const roomSignalingDataHandler = (socket, data) => {
    const { connUserSocketID, signal } = data;

    const signalData = { signal, connUserSocketID: socket.id };
    socket.to(connUserSocketID).emit('conn-signal', signalData);
};

module.exports = roomSignalingDataHandler;