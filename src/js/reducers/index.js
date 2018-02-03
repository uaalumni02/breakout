import { combineReducers } from 'redux';
import {Profile, User} from './User';
import { AllMedia, Media } from './Media'

export default combineReducers({
  AllMedia,
  User,
  Media,
  Profile,
});
