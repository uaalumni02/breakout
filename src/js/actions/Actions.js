import axios from 'axios';
import * as TYPE from './Types';
import * as PATH from '../helpers/Path';
import * as LOCALTOKEN from '../helpers/LocalToken';
import * as AXIOSDEFAULT from '../helpers/SetAxiosDefault';

const getHomeVideo = () => (dispatch) => {
    return axios.get('/')
      .then((res) => {
        return dispatch({ type: TYPE.SET_HOME_VIDEO, data: res.data });
      })
      .catch(error => dispatch(error));
}

const signup = (requestBody) => (dispatch) => {
  return axios.post(PATH.SIGNUP, requestBody)
    .then((res) => {
      LOCALTOKEN.AddTokenToLocalStorage(res.data.token);
      AXIOSDEFAULT.setRequestToken(res.data.token)
      return dispatch({ type: TYPE.SET_USER, data: res.data });
    })
}

const login = (requestBody) => (dispatch) => {
  return axios.post(PATH.LOGIN, requestBody)
  .then((res) => {
    console.log(res.data);
    LOCALTOKEN.AddTokenToLocalStorage(res.data.token);
    AXIOSDEFAULT.setRequestToken(res.data.token)
    return dispatch({ type: TYPE.SET_USER, data: res.data });
  }
)
  .catch((err) => console.log(err.message))
}

const addMedia = (requestBody) => (dispatch) => {  
  requestBody.created = Date.now()
  return axios.post(PATH.MEDIA, requestBody)    
  .then((res) => {
    window.location.href = `../media/${res.data.data.media_id}`
    return dispatch({ type: TYPE.SET_MEDIA, data: res.data });
  })

}

const getMedia = (mediaId) => (dispatch) => {
  const endPoint = `${PATH.MEDIA}/${mediaId}`;
  return axios.get(endPoint)
  .then((res) => {
    return dispatch({ type: TYPE.SET_MEDIA, data: res.data.data });
  })
}


const getAllMedia = () => (dispatch) => {
  return axios.get(PATH.MEDIA)
  .then((res) => {
    return dispatch({ type: TYPE.SET_ALL_MEDIA, data: res.data.data });
  })
}

const getMyMedia = () => (dispatch) => {
  const endPoint = `${PATH.MEDIA}/media/me`;
  return axios.get(endPoint)
  .then((res) => {
    return dispatch({ type: TYPE.SET_ALL_MEDIA, data: res.data });
  })
}

const getUserProfile = (userId) => (dispatch) => {
  const endPoint = `${PATH.PROFILE}/${userId}`;
  return axios.get(endPoint)
  .then((res) => {
    return dispatch({ type: TYPE.SET_CURRENT_PROFILE, data: res.data });
  })
}


const getMyProfile = () => (dispatch) => {
  const endPoint = `${PATH.PROFILE}/me`;
  return axios.get(endPoint)
  .then((res) => {
    return dispatch({ type: TYPE.SET_CURRENT_PROFILE, data: res.data });
  })
}

const addComment = (mediaId, requestBody) => (dispatch) => {
  const endPoint = `api/comment/${mediaId}`;
  return axios.post(endPoint, requestBody)
  .then((res) => {
    dispatch({ type: TYPE.SET_MEDIA, data: res.data });
    // return dispatch({ type: "UPDATE_COMMENT", data: res.data });
    const mediaPath = `../media/${mediaId}`;
    window.location.href = mediaPath;

  })
}

const addRating = (mediaId, requestBody) => (dispatch) => {
  const endPoint = `api/rate/${mediaId}`;
  return axios.post(endPoint, requestBody)
  .then((res) => {
    dispatch({ type: TYPE.SET_MEDIA, data: res.data });
    const mediaPath = `../media/${mediaId}`;
    window.location.href = mediaPath;
  })
  .catch((err) => console.log(err.message));
}

export {
  addComment,
  addMedia,
  addRating,
  getAllMedia,
  getMedia,
  getMyMedia,
  login,
  signup,
  getUserProfile,
}

