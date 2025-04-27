import React, {useEffect} from 'react';
import { styled } from "@mui/system";
import SideBar from "./sideBar/SideBar";
import FriendsSideBar from "./friendsSidebar/FriendsSideBar";
import Messenger from "./messenger/Messenger";
import AppBar from "./appBar/AppBar";
import {logout} from "../shared/utils/auth";
import { connect } from 'react-redux';
import { getActions } from '../store/actions/authActions';
import {socketConnection} from "../realTimeCommunication/socketConnection";

const Wrapper =
    styled('div')({
        width: '100%',
        height: '100vh',
        display: 'flex',
    });

const DashBoard = ({setUserDetails}) => {
    useEffect(() => {
        const userDetails = localStorage.getItem('user');
        if(!userDetails){
            logout();
        } else {
            const parsedUserDetails = JSON.parse(userDetails)
            console.log('JSON.parse(userDetails)', parsedUserDetails);

            setUserDetails(parsedUserDetails);
            socketConnection(parsedUserDetails);
        }

    }, [setUserDetails]);
    return (
        <Wrapper>
            <SideBar />
            <FriendsSideBar />
            <Messenger />
            <AppBar />
        </Wrapper>
    );
};

const mapActionsToProps = (dispatch) => {
    return {
        ...getActions(dispatch),
    };
};

export default connect(null, mapActionsToProps)(DashBoard);