import React, {useEffect} from 'react';
import Messages from './Messages/Messages';
import NewMessageInput from './NewMessageInput';
import {styled} from "@mui/system";
import {getDirectChatHistory} from "../../realTimeCommunication/socketConnection";

const Wrapper = styled('div')({
    flexGrow: 1,
});
const MessangerContent = ({ chosenChatDetails }) => {
    useEffect(() => {
        getDirectChatHistory({
            receiverUserId: chosenChatDetails.id,
        });

    }, [chosenChatDetails]);
    return (
        <Wrapper>
            <Messages />
            <NewMessageInput />
        </Wrapper>
    );
};

export default MessangerContent;