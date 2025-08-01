import store from "../store/store";
import {setLocalStream, setRemoteStreams} from "../store/actions/roomActions";
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

export const prepareNewPeerConnection = (connUserSocketID, isInitiator) => {
    const localStream = store.getState().localStream;
    console.log('in prepareNewPeerConnection, connUserSocketID:')
    console.log(connUserSocketID)

    if (isInitiator) {
        console.log('preparing new peer connection as initiator');
    } else {
        console.log('preparing new peer connection as NOT initiator');
    }

    peers[connUserSocketID] = new Peer({
        initiator: isInitiator,
        config: getConfiguration(),
        stream: localStream,
    });

    console.log("prepareNewPeerConnection CALLED");
    console.log(peers[connUserSocketID]);
// TODO this  part not working
    peers[connUserSocketID].on('signal', data => {
        console.log("SIGNAL EVENT TRIGGERED");
        console.log(data);

        const signalData = {
            signal: data,
            connUserSocketID: connUserSocketID,
        };
        console.log("signalData");
        console.log(signalData);

        socketConnection.signalPeerData(signalData);

        // TODO NotReadableError: Could not start video source
        // Can not get an access to local stream
        // socketConnection.signalPeerData(signalData);
    });

    console.log("after peers[connUserSocketID].on('signal', data => {");

    peers[connUserSocketID].on('stream', (remoteStream) => {
        // TODO add new remote stream
        console.log('remote stream came');
        console.log('direct connection has been established');
        remoteStream.connUserSocketID = connUserSocketID;
        addNewRemoteStream(remoteStream);
    });
};

const addNewRemoteStream = (remoteStream) => {
    const remoteStreams = store.getState().room.remoteStreams;
    const newRemoteStreams = [...remoteStreams, remoteStream];

    store.dispatch(setRemoteStreams(newRemoteStreams));
}

export const handleSignalingData = (data) => {
    const {connUserSocketID, signal} = data;
    if (peers[connUserSocketID]) {
        console.log('Handling signal from peer:', connUserSocketID);
        peers[connUserSocketID].signal(signal);
    } else {
        console.warn('No peer found for:', connUserSocketID);
    }
};

export const closeAllConnections = () => {
    Object.entries(peers).forEach(mappedObject => {
        const connUserSocketID = mappedObject[0];
        if (peers[connUserSocketID]){
            peers[connUserSocketID].destroy();
            delete peers[connUserSocketID];
        }
    });
};