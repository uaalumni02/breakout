export const AddTokenToLocalStorage = (token) => {
    localStorage.setItem('token', token);
}

export const RemoveTokenFromLocalStorage = () => {
    localStorage.removeItem('token');
}
