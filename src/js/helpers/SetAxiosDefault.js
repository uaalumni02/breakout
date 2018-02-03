import axios from 'axios';

export const setBaseUrl= () => {
    axios.defaults.baseURL = 'https://breakout-server-api.herokuapp.com'; 
    return true;
}

export const setRequestToken = (token) => {
    axios.defaults.headers.common['token'] = token;
    return true;
}

export const setFormPostType = () => {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    return true;
}