import io from 'socket.io-client';
import {
    setPendingInvitation,
    setFriends,
    setOnlineUsers,
} from "../store/actions/friendsActions";
import store from "../store/store";
import {updateDirectChatHistoryIfActive} from "../shared/utils/chat";
import * as roomHandler from "./roomHandler";
import * as webRtcHandler from "./webRtcHandler";

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

        store.dispatch(setPendingInvitation(pendingInvitations));
    });

    socket.on('friends-list', (data) => {
        store.dispatch(setFriends(data.friends));
    });

    socket.on('online-users', (data) => {
        const { onlineUsers } = data;
        store.dispatch(setOnlineUsers(onlineUsers));
    });

    socket.on('direct-chat-history', (data) => {
        updateDirectChatHistoryIfActive(data);
    });

    socket.on('room-create', (data) => {
        console.log(data);
        roomHandler.newRoomCreated(data);
    });

    socket.on('active-rooms', data => {
        roomHandler.updateActiveRooms(data);
    });

    socket.on('conn-prepare', data => {
        console.log('prepare to connection');
        console.log(data);
        const { connUserSocketID } = data;
        webRtcHandler.prepareNewPeerConnection(connUserSocketID, false);
        socket.emit('conn-init', { connUserSocketID: connUserSocketID });
    });

    socket.on('conn-init', (data) => {
        const { connUserSocketID } = data;
        console.log("connUserSocketID");
        console.log(connUserSocketID);
        webRtcHandler.prepareNewPeerConnection(connUserSocketID, true);
    });

    socket.on('conn-signal', data => {
        webRtcHandler.handleSignalingData(data);
    });
};

export const signalPeerData = (data) => {
    socket.emit('conn-signal', data);
};

export const sendDirectMessage = (data) => {
  console.log(data);
  socket.emit('direct-message', data);
};

export const getDirectChatHistory = (data) => {
    socket.emit('direct-chat-history', data);
}

export const createNewRoom = () => {
    socket.emit('room-create');
}

export const joinRoom = (data) => {
    socket.emit('room-join', data);
};

export const leaveRoom = (data) => {
    socket.emit('room-leave', data);
};