import React, {useEffect} from 'react';
import Messages from './Messages/Messages';
import NewMessageInput from './NewMessageInput';
import {styled} from "@mui/system";

const Wrapper = styled('div')({
    flexGrow: 1,
});
const MessangerContent = ({ chosenChatDetails }) => {
    useEffect(() => {
        // TODO: fetching chat history

    }, [chosenChatDetails]);
    return (
        <Wrapper>
            <Messages />
            <NewMessageInput />
        </Wrapper>
    );
};

export default MessangerContent;