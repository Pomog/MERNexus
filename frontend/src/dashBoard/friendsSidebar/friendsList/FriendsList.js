import React from 'react';
import { styled } from '@mui/material/styles';
import FriendsListItem from "./FriendsListItem";

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
    /**
     * @type {import('react').ReactElement[]}
     */
    const friendElements = DUMMY_FRIENDS.map(f => (
        <FriendsListItem
            key={f.id}
            id={f.id}
            username={f.username}
            isOnline={f.isOnline}
        />
    ));

    return <MainContainer>{friendElements}</MainContainer>;
};

export default FriendsList;