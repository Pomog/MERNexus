import store from "../store/store";
import {setOpenRoom, setRoomDetails, setActiveRooms} from "../store/actions/roomActions";
import * as socketConnection from "./socketConnection";

export const createNewRoom = () => {
    store.dispatch(setOpenRoom(true, true));
    socketConnection.createNewRoom();
};

export const newRoomCreated = (data) => {
    const { roomDetails } = data;
    store.dispatch(setRoomDetails(roomDetails));
};

export const updateActiveRooms = (data) => {
    const { activeRooms } = data;
    console.log('new active rooms came');
    console.log(activeRooms);

    const friends = store.getState().friends.friends;

    const rooms = [];

    activeRooms.forEach(room => {
        friends.forEach(f => {
            if (f.id === room.roomCreator.userId){
                rooms.push({...room, creatorUsername: f.userName});
                console.log({...room, creatorUsername: f.userName});
            }
        });
    });

    store.dispatch(setActiveRooms(rooms));
};

export const joinRoom = (roomId) => {
    store.dispatch(setRoomDetails({roomId}));

    socketConnection.joinRoom({roomId});

    store.dispatch(setOpenRoom(false, true));
}

export const leaveRoom = () => {
    const roomToLeave = store.getState().room.roomDetails.roomId;

    socketConnection.leaveRoom({ roomToLeave });

    store.dispatch(setRoomDetails(null));
    store.dispatch(setOpenRoom(false, false));
}