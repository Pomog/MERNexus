const Message = require("../models/message");
const Conversation = require("../models/conversation");
const chatUpdates = require("./updates/chat");
const directMessageHandler = async (soket, data) => {
    try {
        console.log("directMessageHandler");

        const {userId} = soket.user;
        const {receiverUserId, content} = data;

        const message = await Message.create({
            content: content,
            author: userId,
            date: new Date(),
            type: 'DIRECT',
        });

        const conversation = await Conversation.findOne({
            participants: {
                $all: [userId, receiverUserId]
            },
        });

        if (conversation) {
            conversation.messages.push(message._id);
            await conversation.save();

            await chatUpdates.updateChatHistory(conversation._id.toString());
        } else {
            const newConversation = await Conversation.create({
                messages: [message._id], participants: [userId, receiverUserId],
            });

            await chatUpdates.updateChatHistory(conversation._id.toString());

        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = directMessageHandler;