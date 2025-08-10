import React from 'react';
import {IconButton} from "@mui/material";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import {setScreenSharingStream} from "../../../store/actions/roomActions";
import * as webRTCHandler from "../../../realTimeCommunication/webRtcHandler";

const constrains = {
    audio: false,
    video: true,
};

const ScreenShareButton = ({
                               localStream,
                               screenSharingStream,
                               setSharingStream,
                               isScreenSharingActive,
                           }) => {
    const handleScreenShareToggle = async () => {
        if (!isScreenSharingActive) {
            let stream = null;
            try {
                stream = await navigator.mediaDevices.getDisplayMedia(constrains);
            } catch (err) {
                console.log('Error on navigator.mediaDevices.getDisplayMedia');
            }

            if (stream) {
                console.log('getting stream from screenSharing, navigator.mediaDevices.getDisplayMedia')
                setScreenSharingStream(stream);
                webRTCHandler.switchOutgoingTracks(stream);
            }

        } else {
            webRTCHandler.switchOutgoingTracks(localStream);
            screenSharingStream.getTracks().forEach(t => t.stop());
            setSharingStream(null);
        }
    };

    return (
        <IconButton onClick={handleScreenShareToggle} style={{color: 'white'}}>
            {isScreenSharingActive ? <ScreenShareIcon/> : <StopScreenShareIcon/>}

        </IconButton>
    );
};

export default ScreenShareButton;