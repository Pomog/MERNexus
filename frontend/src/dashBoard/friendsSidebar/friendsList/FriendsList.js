import React from 'react';
import { styled } from '@mui/material/styles';
import FriendsListItem from "./FriendsListItem";
import { connect } from 'react-redux';

const MainContainer =
    styled('div')(({ theme }) => ({
        flexGrow: 1,
        width: '100%',
    }));

const checkOnlineUsers = (friends = [], onlineUsers = []) => {
    friends.forEach(f => {
        const isUserOnline = onlineUsers.find(user => user.userId === f.id);
        f.isOnline = !!isUserOnline;
    });
    return friends;
};

const FriendsList = ({ friends, onlineUsers }) => {
    console.log("friends");
    console.log(friends);
    /**
     * @type {import('react').ReactElement[]}
     */
    const friendElements = checkOnlineUsers(friends, onlineUsers).map(f => (
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