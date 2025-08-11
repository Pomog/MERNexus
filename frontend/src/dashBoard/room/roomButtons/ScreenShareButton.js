import React from 'react';
import {IconButton} from "@mui/material";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import * as webRTCHandler from "../../../realTimeCommunication/webRtcHandler";

const constraints = {
    audio: false,
    video: true,
};

const ScreenShareButton = ({
                               localStream,
                               screenSharingStream,
                               setScreenSharingStream,
                               isScreenSharingActive,
                           }) => {
    const handleScreenShareToggle = async () => {
        if (!isScreenSharingActive) {
            let stream = null;
            try {
                stream = await navigator.mediaDevices.getDisplayMedia(constraints);
                if (stream) {
                    console.log('Dispatching SET_SCREEN_SHARE_STREAM with screen stream');
                    setScreenSharingStream(stream);
                    webRTCHandler.switchOutgoingTracks(stream);
                }
            } catch (err) {
                console.log('Error on navigator.mediaDevices.getDisplayMedia');
            }
        } else {
            console.log('Stopping screen share');
            webRTCHandler.switchOutgoingTracks(localStream);
            if (screenSharingStream) {
                screenSharingStream.getTracks().forEach(t => t.stop());
            }
            setScreenSharingStream(null);
        }
    };

    return (
        <IconButton onClick={handleScreenShareToggle} style={{color: 'white'}}>
            {isScreenSharingActive ? <ScreenShareIcon/> : <StopScreenShareIcon/>}

        </IconButton>
    );
};

export default ScreenShareButton;