import React from 'react';
import {styled} from "@mui/system";
import Avatar from "../../../shared/components/Avatar";
import {Typography} from "@mui/material";

const MainContainer = styled('div')({
    width: '97%',
    display: 'flex',
    marginTop: '10px',
});

const AvatarContainer = styled('div')({
    width: '70px',
});

const MessageContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column'
});

const MessageContent = styled('div')({
    color: '#DCDDDE',
});

const SameAuthorMessageContent = styled('div')({
    color: '#DCDDDE',
    width: '97%'
})

const SameAuthorMessageText = styled('span')({
    marginLeft: '70px'
});

const Message = ({messageId, content, userName, date, sameDay, sameAuthor}) => {
    if (sameAuthor && sameDay) {
        return (
            <SameAuthorMessageContent>
                <SameAuthorMessageText>{content}</SameAuthorMessageText>
            </SameAuthorMessageContent>
        );
    }
    return (
        <MainContainer>
            <AvatarContainer>
                <Avatar userName={userName}/>
            </AvatarContainer>
            <MessageContainer>
                <Typography style={{
                    fontSize: '16px', color: 'white'
                }}>
                    {userName}{' '}
                    <span style={{fontSize: '12px', color: '#72767D'}}>
                        {date}
                    </span>
                </Typography>
                <MessageContent>
                    {content}
                </MessageContent>
            </MessageContainer>
        </MainContainer>
    );
};

export default Message;