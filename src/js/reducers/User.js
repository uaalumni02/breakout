import * as Type from '../actions/Types';

const User = (state={ isLoggedIn: false, error: 'Unable to login'}, action) => {
    switch(action.type) {
        case Type.SET_USER:
            return Object.assign({}, state, { isLoggedIn: !action.isLoggedIn });
        default:
            return state
    }
}

const Profile = (state={ user: {} , media: {}, comments: {} }, action) => {
    switch(action.type) {
        case Type.SET_CURRENT_PROFILE:
        return Object.assign({}, state, { user: action.data.data.user, media: action.data.data.media, comments: action.data.data.comment});
        default:
            return state
    }
}

export { 
    User,
    Profile,
}
