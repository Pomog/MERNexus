import React from 'react';
import Button from "@mui/material/Button";
import Avatar from "../../../shared/components/Avatar";
import {Typography} from "@mui/material";
import OnlineIndicator from "./OnlineIndicator";
import {chatType, getActions} from "../../../store/actions/chatActions";
import {connect} from "react-redux";

const FriendsListItem = ({id, userName, isOnline, setChosenChatDetails}) => {
    const handleChooseActiveConversation = () => {
        setChosenChatDetails(
            {
                id: id,
                name: userName,
            },
            chatType.DIRECT);
    };
    return (
        <Button
            onClick={handleChooseActiveConversation}
            style={{
                width: '100%',
                height: '42px',
                marginTop: '10px',
                display: 'flex',
                justifyContent: 'flex-start',
                textTransform: 'none',
                color: 'black',
                position: 'relative',
            }}
        >
            <Avatar userName={userName}/>
            <Typography
                style={{
                    marginLeft: '7px',
                    fontWeight: '700',
                    color: '#8e9297',
                }}
                variant='subtitle1'
                align='left'
            >
                {userName}
            </Typography>
            {isOnline && <OnlineIndicator/>}
        </Button>
    );
};

const mapActionsToProps = (dispatch) => {
    return {
        ...getActions(dispatch),
    };
};

export default connect(null, mapActionsToProps)(FriendsListItem);