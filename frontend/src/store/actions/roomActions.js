export const roomActions = {
    OPEN_ROOM: 'ROOM.OPEN_ROOM',
    SET_ROOM_DETAILS: 'ROOM.SET_ROOM_DETAILS',
    SET_ACTIVE_ROOMS: 'ROOM.SET_ACTIVE_ROOMS',
    SET_LOCAL_STREAM: 'ROOM.SET_LOCAL_STREAM',
    SET_REMOTE_STREAMS: 'ROOM.SET_REMOTE_STREAMS',
    SET_AUDIO_ONLY: 'ROOM.SET_AUDIO_ONLY',
    SET_SCREEN_SHARE_STREAM: 'ROOM.SET_SCREEN_SHARE_STREAM',
    SET_IS_USER_JOINED_WITH_ONLY_AUDIO: "ROOM.SET_IS_USER_JOINED_WITH_ONLY_AUDIO",
};

export const setOpenRoom = (isUserRoomCreator = false, isUserInRoom = false) => {
    return {
        type: roomActions.OPEN_ROOM,
        isUserRoomCreator,
        isUserInRoom,
    }
};

export const setRoomDetails = (roomDetails) => {
    return {
        type: roomActions.SET_ROOM_DETAILS,
        roomDetails,
    };
};

export const setActiveRooms = (activeRooms) => {
    return {
        type: roomActions.SET_ACTIVE_ROOMS,
        activeRooms,
    };
};

export const setLocalStream = (localStream) => {
    return {
        type: roomActions.SET_LOCAL_STREAM,
        localStream,
    };
};

export const setAudioOnly = (audioOnly) => {
    return {
        type: roomActions.SET_AUDIO_ONLY,
        audioOnly,
    };
};

export const getActions = (dispatch) => {
    return {
        setAudioOnly: (audioOnly) => dispatch(setAudioOnly(audioOnly))
    };
};

export const setIsUserJoinedOnlyWithAudio = (onlyWithAudio) => {
    return {
        type: roomActions.SET_IS_USER_JOINED_WITH_ONLY_AUDIO,
        isUserJoinedWithOnlyAudio: onlyWithAudio,
    };
};