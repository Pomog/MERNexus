import React from 'react';
import { styled } from '@mui/material/styles';
import FriendsListItem from "./FriendsListItem";

/**
 * @typedef {{ id: number, username: string, isOnline: boolean }} Friend
 */

/** @type {Friend[]} */
const DUMMY_FRIENDS = [
    {
        id: 1,
        username: 'Yurii',
        isOnline: true,
    },
    {
        id: 2,
        username: 'Andrey',
        isOnline: true,
    },
    {
        id: 3,
        username: 'Nelya',
        isOnline: false,
    },
];

const MainContainer =
    styled('div')(({ theme }) => ({
        flexGrow: 1,
        width: '100%',
    }));

const FriendsList = () => {
    return (
        <MainContainer>
            {DUMMY_FRIENDS.map( (f) => (
                <FriendsListItem
                    username={f.username}
                    id={f.id}
                    key={f.id}
                    isOnline={f.isOnline}
                />
            ))}
        </MainContainer>
    );
};

export default FriendsList;