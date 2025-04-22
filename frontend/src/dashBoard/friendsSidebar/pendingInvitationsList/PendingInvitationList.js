import React from 'react';
import { styled } from '@mui/material/styles';
import PendingInvitationListItem from "./PendingInvitationListItem";

const DUMMY_INVITATION = [
    {
        _id: '1',
        senderId: {
            username: 'Anna',
            mail: 'test1@mail.com',
        },
    },
    {
        _id: '2',
        senderId: {
            username: 'Bob',
            mail: 'test2@mail.com',
        },
    },
]

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
    /**
     * @type {import('react').ReactElement[]}
     */
    const invitationElements = DUMMY_INVITATION.map(inv => (
        <PendingInvitationListItem
            key={inv._id}
            id={inv._id}
            username={inv.senderId.username}
            mail={inv.senderId.mail}
        />
    ));
    return (
        <MainContainer>
            {invitationElements}
        </MainContainer>
    );
};

export default PendingInvitationList;