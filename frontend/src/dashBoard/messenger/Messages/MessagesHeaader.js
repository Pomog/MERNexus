import React from 'react';
import {styled} from "@mui/system";
import Avatar from '../../../shared/components/Avatar';
import {Typography} from "@mui/material";

const MainContainer = styled('div')({
    width: '98%',
    marginTop: '10px',
    display: 'column',
});

const MessagesHeader = ({name = ''}) => {
    return (
        <MainContainer>
            <Avatar large userName={name}/>
            <Typography
                variant='h4'
                sx={{
                    fontWeight: 'bold',
                    color: 'white',
                    marginLeft: '5px',
                    marginRight: '5px',
                }}
            >
                {name}
            </Typography>
            <Typography
                sx={{
                   color: '#b9bbbe',
                    marginLeft: '5px',
                    marginRight: '5px',
                }}
            >
                This is the beginning of your conversation with {name}
            </Typography>
        </MainContainer>
    );
};

export default MessagesHeader;