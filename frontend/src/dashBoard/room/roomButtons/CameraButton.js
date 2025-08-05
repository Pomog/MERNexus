import React, {useState} from 'react';
import {IconButton} from "@mui/material";
import VideoCamIcon from "@mui/icons-material/Videocam";
import VideoCamOffIcon from "@mui/icons-material/VideocamOff";

const CameraButton = ({ localStream }) => {
    const [cameraEnabled, setCameraEnabled] = useState(true);

    const handleToggleCamera = () => {
        localStream.getVideoTracks()[0].enabled = !cameraEnabled
        setCameraEnabled(!cameraEnabled);
    };

    return (
        <IconButton onClick={handleToggleCamera} style={{ color: 'white' }}>
            {cameraEnabled ? <VideoCamIcon /> : <VideoCamOffIcon /> }
            
        </IconButton>
    );
};

export default CameraButton;