import React, { useState } from 'react';
import { styled } from '@mui/system';
import ResizeRoomButton from "./ResizeRoomButton";

const MainContainer = styled('div')({
    position: 'absolute',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#202225',

});

const fullScreenRoomStyle = {
    widths: '100%',
    height: '100vh',
};

const minimizedScreenRoomStyle = {
    bottom: '0px',
    right: '0px',
    widths: '30%',
    height: '40vh',
};

const Room = () => {
    const [ isRoomMinimized, setIsRoomMinimized ] = useState(true);

    const roomResizeHandler = () => {
        setIsRoomMinimized(!isRoomMinimized);
    }

    return (
        <MainContainer
            style={isRoomMinimized ? minimizedScreenRoomStyle : fullScreenRoomStyle}>

            <ResizeRoomButton
                isRoomMinimized={isRoomMinimized}
                handleRoomResize={roomResizeHandler}
                />
            
        </MainContainer>
    );
};

export default Room;
