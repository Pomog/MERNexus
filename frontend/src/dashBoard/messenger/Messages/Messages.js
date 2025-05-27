import React from 'react';
import MessagesHeader from './MessagesHeaader';
import {connect} from "react-redux";
import {styled} from "@mui/system";
import DUMMY_MESSAGES from "./DummyMewssage";
import Message from './Message';

const MainContainer = styled('div')({
    height: 'calc(100% - 60px)',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const Messages = ({ chosenChatDetails, messages }) => {
    return (
        <MainContainer>
            <MessagesHeader
                name={chosenChatDetails?.name}
            />
            {DUMMY_MESSAGES.map((message,index) => {
                return <Message
                    key={message._id}
                    content={message.content}
                    userName={message.author.userName}
                    date={message.date}
                    sameDay={message.sameDay}

                />

            })}
        </MainContainer>
    );
};

const mapStoreStateToProps = ({ chat }) => {
    return {
        ...chat,
    };
};

export default connect(mapStoreStateToProps)(Messages);