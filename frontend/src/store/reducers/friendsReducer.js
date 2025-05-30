import {friendsActions as friendsAction} from "../actions/friendsActions";

const initState= {
    friends: [],
    pendingFriendsInvitations: [],
    onlineUsers: [],
};

const reducer = (state = initState, action) => {
    console.log('[friendsReducer]', action.type, action);
    console.log("action");
    console.log(action.toString());
    switch (action.type){
        case friendsAction.SET_PENDING_FRIENDS_INVITATIONS:
            return {
                ...state,
                pendingFriendsInvitations: action.pendingFriendsInvitations,
            };
        case friendsAction.SET_FRIENDS:
            return {
                ...state,
                friends: action.friends,
            };
        case friendsAction.SET_ONLINE_USERS:
            return {
                ...state,
                onlineUsers: action.onlineUsers,
            };
        default:
            return state;

        }
};

export default reducer;