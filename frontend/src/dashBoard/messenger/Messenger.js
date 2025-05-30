import React from 'react';
import {styled} from "@mui/system";
import {connect} from "react-redux";
import MessangerContent from "./MessangerContent";
import WelcomeMessage from "./WelcomeMessage";

const MainContainer =
    styled('div')({
        flexGrow: 1,
        backgroundColor: '#36393f',
        marginTop: '48px',
        display: 'flex',
    });

const Messenger = ({chosenChatDetails}) => {
    return (
        <MainContainer>
            {!chosenChatDetails ? (<WelcomeMessage/>) :
                <MessangerContent chosenChatDetails={chosenChatDetails}/>}
        </MainContainer>
    );
};

const mapStoreStateToProps = ({chat}) => {
    return {
        ...chat
    };
};

export default connect(mapStoreStateToProps)(Messenger);