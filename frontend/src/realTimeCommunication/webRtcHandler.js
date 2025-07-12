import store from "../store/store";
import {setLocalStream} from "../store/actions/roomActions";
import Peer from 'simple-peer';

const onlyAudioConstraints = {
    audio: true,
    video: false,
};

const defaultConstraints = {
    audio: true,
    video: true,
};

const getConfiguration = () => {
    const turnIceServers = null;

    if (turnIceServers) {
        // TODO use TURN server credentials
    } else {
        console.warn("USING STUN SERVER");
        return {
            iceServers: [
                {
                   urls: 'stun:stun.l.google.com:19302'
                },
            ],
        };
    }
};

export const getLocalStreamPreview = (
    onlyAudio = false,
    callBackFunction,
) => {
    const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        store.dispatch(setLocalStream(stream));
        callBackFunction();
    }).catch(err => {
        console.log(err);
        console.log('Can not get an access to local stream');
    });
};

let peers = {};

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
    const localStream = store.getState().localStream;

    if (isInitiator) {
        console.log('preparing new peer connection as initiator');
    } else {
        console.log('preparing new peer connection as NOT initiator');
    }

    peers[connUserSocketId] = new Peer({
        initiator: isInitiator,
        config: getConfiguration(),
    });


};