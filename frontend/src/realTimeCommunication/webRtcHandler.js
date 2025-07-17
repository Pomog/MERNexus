import store from "../store/store";
import {setLocalStream} from "../store/actions/roomActions";
import Peer from 'simple-peer';
import * as socketConnection from "./socketConnection";


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
        // TODO
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
        stream: localStream,
    });

    peers[connUserSocketId].on('signal', data => {
       const signalData = {
           signal: data,
           connUserSocketId: connUserSocketId,
       };
        console.log("signalData");
        console.log(signalData);

        socketConnection.signalPeerData(signalData);

       // TODO NotReadableError: Could not start video source
       // Can not get an access to local stream
       // socketConnection.signalPeerData(signalData);
    });

    peers[connUserSocketId].on('stream', (remoteStream) => {
        // TODO add new remote stream
        console.log('remote stream came');
        console.log('direct connection has been established');

    });
};

export const handleSignalingData = (data) => {
    const { connUserSocketId, signal } = data;
    if (peers[connUserSocketId]) {
        peers[connUserSocketId].signal(signal);
    }
};