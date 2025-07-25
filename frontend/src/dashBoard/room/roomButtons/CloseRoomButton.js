import React from 'react';
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as roomHandler from "../../../realTimeCommunication/roomHandler";

const CloseRoomButton = () => {

    const handleLeaveRoom = () => {
        roomHandler.leaveRoom();
    };

    return (
        <IconButton onClick={handleLeaveRoom} style={{ color: 'white' }}>
            <CloseIcon />

        </IconButton>
    );
};

export default CloseRoomButton;