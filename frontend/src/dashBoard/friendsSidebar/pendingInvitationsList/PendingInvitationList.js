import React from 'react';
import { styled } from '@mui/material/styles';

const MainContainer =
    styled('div')(({ theme }) => ({
        height: '22%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'auto',
    }));

const PendingInvitationList = () => {
    return (
        <MainContainer>
            
        </MainContainer>
    );
};

export default PendingInvitationList;