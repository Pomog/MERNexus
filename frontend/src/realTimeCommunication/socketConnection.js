import io from 'socket.io-client';
import {
    setPendingInvitation,
    setFriends,
    setOnlineUsers,
} from "../store/actions/friendsActions";
import store from "../store/store";

let socket = null;

export const socketConnection = (userDetails) => {
    if (socket) return socket;
    const jwtToken = userDetails.token;
    socket = io('http://localhost:5002', {
        auth: {
            token: jwtToken
        },
    });

    socket.on('connect', () => {
        console.log('successfully connected');
        console.log(socket.id);
    });

    socket.on('friends-invitations', (data) => {
        const { pendingInvitations } = data;
        console.log('friends-invitations event came');
        console.log('data');
        console.log(data);
        console.log('pendingInvitation');
        console.log(pendingInvitations);
        
        store.dispatch(setPendingInvitation(pendingInvitations));
    });

    socket.on('friends-list', (data) => {
        const { friends } = data;
        console.log("'friends-list'");
        console.log(friends);
        store.dispatch(setFriends(friends));
    });

    socket.on('online-users', (data) => {
        console.log("online users update came");
        console.log(data);
        const { onlineUsers } = data;
        store.dispatch(setOnlineUsers(onlineUsers));
    });

    socket.on('direct-chat-history', (data) => {
        console.log("direct-chat-history");
        console.log(data);
    });
};

export const sendDirectMessage = (data) => {
  console.log(data);
  socket.emit('direct-message', data);
};

export const getDirectChatHistory = (data) => {
    socket.emit('direct-chat-history', data);
}