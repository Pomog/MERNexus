import store from "../store/store";
import {setOpenRoom, setRoomDetails, setActiveRooms, setLocalStream} from "../store/actions/roomActions";
import * as socketConnection from "./socketConnection";
import * as webRTCHandler from './webRtcHandler';

export const createNewRoom = () => {
    const successCallBack = () => {
        store.dispatch(setOpenRoom(true, true));
        socketConnection.createNewRoom();
    };

    const audioOnly = store.getState().room.audioOnly;

    webRTCHandler.getLocalStreamPreview(audioOnly, successCallBack);
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
    const successCallBack = () => {
        store.dispatch(setRoomDetails({roomId}));

        socketConnection.joinRoom({roomId});

        store.dispatch(setOpenRoom(false, true));

    };

    const onlyAudio = store.getState().room.audioOnly;

    webRTCHandler.getLocalStreamPreview(onlyAudio, successCallBack);
}

export const leaveRoom = () => {
    const roomToLeave = store.getState().room.roomDetails.roomId;

    socketConnection.leaveRoom({ roomToLeave });

    const localStream = store.getState().room.localStream;
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        store.dispatch(setLocalStream(null));
    }

    store.dispatch(setRoomDetails(null));
    store.dispatch(setOpenRoom(false, false));
}