import store from "../store/store";
import {
    setActiveRooms,
    setLocalStream,
    setOpenRoom,
    setRoomDetails,
    setIsUserJoinedOnlyWithAudio, setRemoteStreams, setScreenSharingStream, setIsUserJoinedWithOnlyAudio
} from "../store/actions/roomActions";
import * as socketConnection from "./socketConnection";
import * as webRTCHandler from './webRtcHandler';

export const createNewRoom = () => {
    const successCallBack = () => {
        store.dispatch(setOpenRoom(true, true));
        const audioOnly =  store.getState().room.audioOnly;
        store.dispatch(setIsUserJoinedWithOnlyAudio(audioOnly));
        socketConnection.createNewRoom();
    };

    const audioOnly = store.getState().room.audioOnly;

    webRTCHandler.getLocalStreamPreview(audioOnly, successCallBack);
};

export const newRoomCreated = (data) => {
    const {roomDetails} = data;
    store.dispatch(setRoomDetails(roomDetails));
};

export const updateActiveRooms = (data) => {
    const {activeRooms} = data;

    const friends = store.getState().friends.friends;

    const rooms = [];

    activeRooms.forEach(room => {
        friends.forEach(f => {
            if (f.id === room.roomCreator.userId) {
                rooms.push({...room, creatorUsername: f.userName});
            }
        });
    });

    store.dispatch(setActiveRooms(rooms));
};

export const joinRoom = (roomId) => {
    const successCallBack = () => {
        store.dispatch(setRoomDetails({roomId}));
        store.dispatch(setOpenRoom(false, true));
        const audioOnly = store.getState().room.audioOnly;
        store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
        socketConnection.joinRoom({roomId});
    };

    const onlyAudio = store.getState().room.audioOnly;

    webRTCHandler.getLocalStreamPreview(onlyAudio, successCallBack);
}

export const leaveRoom = () => {
    const roomToLeave = store.getState().room.roomDetails.roomId;

    socketConnection.leaveRoom({roomToLeave});

    const localStream = store.getState().room.localStream;
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        store.dispatch(setLocalStream([]));
    }
    
    const screenSharingStream = store.getState().room.screenSharingStream;
    if (screenSharingStream) {
        screenSharingStream.getTracks().forEach(track => track.stop());
        store.dispatch(setScreenSharingStream(null));
    }

    store.dispatch(setRemoteStreams([]));
    webRTCHandler.closeAllConnections();

    store.dispatch(setRoomDetails(null));
    store.dispatch(setOpenRoom(false, false));
}