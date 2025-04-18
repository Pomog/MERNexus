import React from 'react';
import { styled } from '@mui/material/styles';
import AddFriendButton from "./AddFriendButton";
import FriendsTitle from "./FriendsTitle";
import FriendsList from "./friendsList/FriendsList";
import PendingInvitationList from "./pendingInvitationsList/PendingInvitationList";


const MainContainer =
    styled('div')(({ theme }) => ({
        width: '224px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.palette.background.default,
    }));

const FriendsSideBar = () => {
    return (
        <MainContainer>
            <AddFriendButton/>
            <FriendsTitle title='Private Messages'/>
            <FriendsList />
            <FriendsTitle title='Invitations'/>
            <PendingInvitationList />
        </MainContainer>
    );
};

export default FriendsSideBar;