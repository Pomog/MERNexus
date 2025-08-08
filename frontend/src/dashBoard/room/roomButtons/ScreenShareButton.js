import React, {useState} from 'react';
import {IconButton} from "@mui/material";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import {setScreenSharingStream} from "../../../store/actions/roomActions";

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
    const [isScreenSharingActive, setScreenSharingActive] = useState(false);

    const handleScreenShareToggle = async () => {
        if (!isScreenSharingActive) {
            let stream = null;
            try {
                stream = await navigator.mediaDevices.getDisplayMedia(constrains);
            } catch (err) {
                console.log('Error on navigator.mediaDevices.getDisplayMedia');
            }

            if (!stream) {
                setScreenSharingStream(stream);
            } else {

            }

        }
    };

    return (
        <IconButton onClick={handleScreenShareToggle} style={{color: 'white'}}>
            {isScreenSharingActive ? <ScreenShareIcon/> : <StopScreenShareIcon/>}

        </IconButton>
    );
};

export default ScreenShareButton;