import React from 'react';
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import {createNewRoom} from "../../realTimeCommunication/roomHandler";

const CreateRoomButton = ({isUserInRoom}) => {
    const createNewRoomHandler = () => {
        createNewRoom();
    };

    return (
        <Button
            disabled={isUserInRoom}
            onClick={createNewRoomHandler}
            style={{
                width: '48px',
                height: '48px',
                padding: '0',
                minWidth: '0',
                marginTop: '10px',
                color: 'white',
                backgroundColor: '#5865F2',
            }}
        >
            <AddIcon />

        </Button>
    );
};

export default CreateRoomButton;