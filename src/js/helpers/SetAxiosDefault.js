import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const setBaseUrl= () => {
    axios.defaults.baseURL = process.env.BASE_URL; 
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