import io from 'socket.io-client';
import {setPendingInvitation} from "../store/actions/friendsActions";
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
        const { pendingInvitation } = data;
        store.dispatch(setPendingInvitation(pendingInvitation));
    });
}