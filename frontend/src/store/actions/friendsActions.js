import {openAlertMessage} from "./alertActions";
import * as api from "../../api";

export const friendsActions = {
    SET_FRIENDS: 'FRIENDS.SET_FRIENDS',
    SET_PENDING_FRIENDS_INVITATIONS: 'FRIENDS.SET_PENDING_FRIENDS_INVITATIONS',
    SET_ONLINE_USERS: 'FRIENDS.SET_ONLINE_USERS',
};

export const getActions = (dispatch) => {
    return {
        sendFriendInvitation: (data) =>
            dispatch(sendFriendInvitation(data)),
    };
};

const sendFriendInvitation = (data) => {
    return async (dispatch) => {
        const response = await api.sendFriendInvitation(data);

        dispatch(openAlertMessage(
            response.error
                ? 'Invitation has been sent!'
                : response.exception?.response?.data
        ));
    };
};