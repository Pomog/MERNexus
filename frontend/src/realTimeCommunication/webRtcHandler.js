import store from "../store/store";
import {setLocalStream} from "../store/actions/roomActions";

const onlyAudioConstraints = {
    audio: true,
    video: false,
};

const defaultConstraints = {
    audio: true,
    video: true,
};

export const getLocalStreamPreview = (
    onlyAudio = false,
    callBackFunction,
) => {
    const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        store.dispatch(setLocalStream(stream));
    } )
};