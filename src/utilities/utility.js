import { LOCAL_STORAGE_NAME } from './constants'

export const isValidToken = (token) => {
    if (!token) {
        return false;
    }

    const payload = token.split(".")[1];

    if (!payload) {
        return false;
    }

    const decodedPayload = JSON.parse(window.atob(payload));
    const expiryTime = decodedPayload.exp * 1000;
    const currentTime = Date.now();
    return expiryTime > currentTime;
};

export const getNonAuthHeaders = () => {
    const headers = {
        "Accept": "*/*",
        'Content-Type': 'application/json',
    }
    return headers
}

export const getAuthHeaders = () => {
    const headers = {
        "Accept": "*/*",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)).accessToken}`
    }
    return headers
}

export const getAccessToken = () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME))?.accessToken;

export const getUserData = () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME))?.userData;