import React from 'react';
import Button from "@mui/material/Button";
import Avatar from "../../../shared/components/Avatar";
import {Typography} from "@mui/material";
import OnlineIndicator from "./OnlineIndicator";

const FriendsListItem = ({id, userName, isOnline}) => {
    return (
        <Button
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
            <Avatar userName={userName} />
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
            {isOnline && <OnlineIndicator />}
        </Button>
    );
};

export default FriendsListItem;