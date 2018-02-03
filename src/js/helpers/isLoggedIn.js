import jwtDecode from 'jwt-decode';

const isLoggedIn = () => {
    const userToken = localStorage.getItem('token');
    if(!userToken)
        return false;
    try {
        const decodedToken = jwtDecode(userToken);

        if(decodedToken.username && decodedToken.firstname ) {
            return true;
        }
    } catch(err) {
        return false;
    }
}

const getTokenData = () => {
    const userToken = localStorage.getItem('token');
    return jwtDecode(userToken);
}

export {
    isLoggedIn,
    getTokenData
}