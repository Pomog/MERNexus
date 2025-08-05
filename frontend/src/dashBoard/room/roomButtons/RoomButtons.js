import React from 'react';
import { styled } from '@mui/system';
import ScreenShareButton from "./ScreenShareButton";
import MicButton from "./MicButton";
import CloseRoomButton from "./CloseRoomButton";
import CameraButton from "./CameraButton";
import { connect } from "react-redux";

const MainContainer = styled('div')({
    height: '15%',
    width: '100%',
    backgroundColor: '#4865f2',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});


const RoomButtons = ({ localStream }) => {
    return (
        <MainContainer>
            <ScreenShareButton />
            <MicButton  localStream={localStream}/>
            <CloseRoomButton />
            <CameraButton localStream={localStream}/>
        </MainContainer>
    );
};

const mapStoreStateToProps = ({ room }) => {
    return {
        ...room,
    };
};
export default connect(mapStoreStateToProps)(RoomButtons);