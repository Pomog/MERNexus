import React from 'react';
import { styled } from "@mui/system";
import SideBar from "./sideBar/SideBar";
import FriendsSideBar from "./friendsSidebar/FriendsSideBar";
import Messenger from "./messenger/Messenger";
import {AppBar} from "@mui/material";

const Wrapper =
    styled('div')({
        width: '100%',
        height: '100vh',
        display: 'flex',
    });

const DashBoard = () => {
    return (
        <Wrapper>
            <SideBar />
            <FriendsSideBar />
            <Messenger />
            <AppBar />

        </Wrapper>
    );
};

export default DashBoard;