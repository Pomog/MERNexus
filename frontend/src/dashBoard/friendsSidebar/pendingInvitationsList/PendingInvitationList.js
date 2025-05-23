import React from 'react';
import { styled } from '@mui/material/styles';
import PendingInvitationListItem from "./PendingInvitationListItem";
import { connect } from 'react-redux';

/**
 * receiverId: "681a5b5c6ee9617e6e6eee19"
 * senderId:
 * * mail: "thoryur@gmail.com"
 * * userName: "testtest"
 * * _id: "67c74404af4a15dc75a5e81d"
*/

const DUMMY_INVITATION = [
    {
        _id: '1',
        senderId: {
            userName: 'Anna',
            mail: 'test1@mail.com',
        },
    },
    {
        _id: '2',
        senderId: {
            userName: 'Bob',
            mail: 'test2@mail.com',
        },
    },
];

const MainContainer =
    styled('div')(({ theme }) => ({
        height: '22%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'auto',
    }));

const PendingInvitationList = ({ pendingFriendsInvitations= [] }) => {
    console.log('pendingFriendsInvitations');
    console.log(pendingFriendsInvitations);
    /**
     * @type {import('react').ReactElement[]}
     */
    const invitationElements = pendingFriendsInvitations.map(inv => (
        <PendingInvitationListItem
            key={inv._id}
            id={inv._id}
            userName={inv.senderId.userName}
            mail={inv.senderId.mail}
        />
    ));
    return (
        <MainContainer>
            {invitationElements}
        </MainContainer>
    );
};

const mapStoreStateToProps = ({ friends }) => {
    return {
        ...friends,
    };
};

export default connect(mapStoreStateToProps)(PendingInvitationList);