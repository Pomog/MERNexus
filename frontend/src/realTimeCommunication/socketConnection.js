import io from 'socket.io-client';

let socket = null;

export const socketConnection = () => {
    socket = io('http://localhost:5002');

    socket.on('connect', () => {
        console.log('successfully connected');
        console.log(socket.id);
    })
}