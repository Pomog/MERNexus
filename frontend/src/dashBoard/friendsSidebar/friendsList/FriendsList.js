import React from 'react';
import { styled } from '@mui/material/styles';
import FriendsListItem from "./FriendsListItem";
import { connect } from 'react-redux';

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

const FriendsList = ({ friends }) => {
    console.log("friends");
    console.log(friends);
    /**
     * @type {import('react').ReactElement[]}
     */
    const friendElements = friends.map(f => (
        <FriendsListItem
            key={f.id}
            id={f.id}
            userName={f.userName}
            isOnline={f.isOnline}
        />
    ));

    return <MainContainer>{friendElements}</MainContainer>;
};

const mapStoreStateToProps = ({ friends }) => {
    return {
        ...friends,
    };
};

export default connect(mapStoreStateToProps)(FriendsList);