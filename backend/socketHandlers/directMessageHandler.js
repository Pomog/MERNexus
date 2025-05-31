const Message = require("../models/message");
const Conversation = require("../models/conversation");
const directMessageHandler = async (soket, data) => {
    try {
        console.log("directMessageHandler");

        const { userId } = soket.user;
        const { receiverUserId, content } = data;

        const message = await Message.create({
            content: content,
            authorId: userId,
            date: new Date(),
            type: 'DIRECT',
        });

        const conversation = await Conversation.findOne({
            participants: {
                $all: [userId, receiverUserId]
            },
        });

        if (conversation) {
            conversation.message.push(message._id);
            await conversation.save();
        } else {
            const newConversation = await Conversation.create({
                messages: [message._id],
                participants: [userId, receiverUserId],
            })


        }

    } catch (err) {
        console.log(err);
    }
};

module.exports = directMessageHandler;