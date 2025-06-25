import React from 'react';
import {Tooltip} from "@mui/material";
import Avatar from '../../shared/components/Avatar';
import Button from "@mui/material/Button";
import * as roomHandler from '../../realTimeCommunication/roomHandler';

const ActiveRoomButton = ({
                              creatorUsername,
                              roomId,
                              amountOfParticipants: amountOfParticipants,
                              isUserInRoom,
                          }) => {
    const handleJoinActiveRoom = () => {
        if (amountOfParticipants < 4) {
            console.log("handleJoinActiveRoom -> roomId");
            console.log(roomId);
            roomHandler.joinRoom(roomId);
        }
    };

    const activeRoomButtonDisabled = amountOfParticipants > 3;
    const roomTitle = `Creator: ${creatorUsername}. "Connected" ${amountOfParticipants}`

    return (
        <Tooltip title={roomTitle}>
            <div>
                <Button
                    style={{
                        width: '48px',
                        height: '48px',
                        padding: '0',
                        minWidth: '0',
                        marginTop: '10px',
                        color: 'white',
                        backgroundColor: '#5865F2',
                    }}
                    disabled={activeRoomButtonDisabled || isUserInRoom}
                    onClick={handleJoinActiveRoom}
                >
                    <Avatar userName={creatorUsername || 'Unknown User'}/>

                </Button>
            </div>

        </Tooltip>
    );
};

export default ActiveRoomButton;