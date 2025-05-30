import React, {useState} from 'react';
import {Tooltip, Typography} from "@mui/material";
import Avatar from "../../../shared/components/Avatar";
import Box from "@mui/material/Box";
import InvitationDecisionButtons from "./InvitationDecisionButtons";
import { connect } from 'react-redux';
import { getActions } from '../../../store/actions/friendsActions';


const PendingInvitationListItem = ({
                                       id,
                                       userName,
                                       mail,
                                       acceptFriendInvitation = () => {
                                       },
                                       rejectFriendInvitation = () => {
                                       },
                                   }) => {
    const [buttonDisabled, setButtonsDisabled] = useState(false);

    const handleAcceptInvitation = () => {
        console.log('handleAcceptInvitation');
        console.log(id);
        acceptFriendInvitation({id});
        setButtonsDisabled(true);
    };

    const handleRejectInvitation = () => {
        console.log('handleRejectInvitation');
        console.log(id);
        rejectFriendInvitation({id});
        setButtonsDisabled(true);
    };

    return (
        <Tooltip title={mail}>
            <div style={{width: '100%'}}>
                <Box
                    sx={{
                        width: '100%',
                        height: '42px',
                        marginTop: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Avatar userName={userName}/>
                    <Typography
                        sx={{
                            marginLeft: '7px',
                            fontWeight: '700',
                            color: '#8e9297',
                            flexGrow: 1,
                        }}
                        variant='subtitle1'
                    >
                        {userName}
                    </Typography>
                    <InvitationDecisionButtons
                        disabled={buttonDisabled}
                        acceptInvitationHandler={handleAcceptInvitation}
                        rejectInvitationHandler={handleRejectInvitation}
                    />
                </Box>
            </div>
        </Tooltip>
    );
};

const mapActionsToProps = (dispatch) => {
    return {
        ...getActions(dispatch),
    };
};
export default connect(
    null,
    mapActionsToProps)
    (PendingInvitationListItem);
