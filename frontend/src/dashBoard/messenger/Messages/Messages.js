import React from 'react';
import MessagesHeader from './MessagesHeaader';
import {connect} from "react-redux";
import {styled} from "@mui/system";
import Message from './Message';
import DateSeparator from "./DateSeparator";

const MainContainer = styled('div')({
    height: 'calc(100% - 60px)',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const Messages = ({chosenChatDetails, messages}) => {
    const convertDateToHumanReadable = (date, format) => {
        const map = {
            mm: date.getMonth() + 1,
            dd: date.getDate(),
            yy: date.getFullYear().toString().slice(-2),
            yyyy: date.getFullYear(),
        };

        return format.replace(/mm|dd|yy|yyy/gi, (matched) => map[matched]);
    };

    return (
        <MainContainer>
            <MessagesHeader
                name={chosenChatDetails?.name}
            />
            {messages.map((message, index) => {
                const sameAuthor = index > 0 &&
                    messages[index].author._id === messages[index - 1].author._id;
                const sameDay = index > 0 &&
                    convertDateToHumanReadable(new Date(message.date), "dd/mm/yy") ===
                    convertDateToHumanReadable(new Date(messages[index - 1].date), "dd/mm/yy");

                console.log(messages);

                return (
                    <div key={message._id} style={{width: '97%'}}>
                        {(!sameDay || index === 0) && (
                            <DateSeparator
                                date={convertDateToHumanReadable(
                                    new Date(message.date), "dd/mm/yy"
                                )}
                            />
                        )}

                        <Message
                            messageId={message._id}
                            content={message.content}
                            userName={message.author.userName}
                            date={convertDateToHumanReadable(
                                new Date(message.date), "dd/mm/yy")}
                            sameDay={sameDay}
                            sameAuthor={sameAuthor}
                        />
                    </div>
                );

            })}
        </MainContainer>
    );
};

const mapStoreStateToProps = ({chat}) => {
    return {
        ...chat,
    };
};

export default connect(mapStoreStateToProps)(Messages);