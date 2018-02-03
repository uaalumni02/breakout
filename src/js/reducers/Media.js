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
        console.log(action.data);
            return Object.assign({}, state, { media: action.data });
        
        case 'UPDATE_COMMENT':
            console.log(action.data.data.comments);
            let ui = action.data.data.comments;
            state.media.comments.push(ui[ui.length-1]);
            return state;
        default:
            return state
    }
}

export {
    AllMedia,
    Media,
}