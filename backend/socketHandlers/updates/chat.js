const Conversation = require('../../models/conversation');
const serverStore = require('../../serverStore');

const updateChatHistory = async (
    conversationId,
    toSpecifiedSocketId = null
) => {
    const conversation = await Conversation.findById(conversationId).populate({
        path: 'messages',
        model: 'Model',
        populate: {
            path: 'author',
            model: 'User',
            select: 'userName _id'
        },
    });
    if (conversation) {
        const io = serverStore.getSocketServerInstance();

        if (toSpecifiedSocketId) {
            // initial update
            return io.to(toSpecifiedSocketId).emit('direct-chat-history', {
                messages: conversation.messages,
                participants: conversation.participants,
            });
        }

        conversation.participants.forEach(userId => {
            const activeConnections = serverStore.getActiveConnections(userId.toString());

            activeConnections.forEach(socketId => {
                io.to(socketId).emit('direct-chat-history', {
                    messages: conversation.messages,
                    participants: conversation.participants,
                });
            });
        })
    }
};

module.exports = { updateChatHistory };