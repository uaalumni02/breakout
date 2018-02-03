import * as Type from '../actions/Types';

const intialState = {
    allMedia: [],
    media: {}
}

const AllMedia = (state = intialState, action) => {
    switch(action.type) {
        case Type.SET_ALL_MEDIA:
            return Object.assign({}, state, { allMedia: action.data });
        default:
            return state
    }
}


const Media = (state = intialState, action) => {
    switch(action.type) {
        case Type.SET_MEDIA:
            return Object.assign({}, state, { media: action.data });
        default:
            return state
    }
}

export {
    AllMedia,
    Media,
}