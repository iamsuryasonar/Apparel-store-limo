import axios from "axios";
import { LOCAL_STORAGE_NAME, API_URL } from '../constants/constant'

let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
}

const register = (creds) => {
    creds.avatar = "https://i.imgur.com/yhW6Yw1.jpg";

    return axios.post(API_URL + 'users/', creds)
}






const login = async (creds) => {
    return axios
        .post(API_URL + "auth/login", creds)
        .then((response) => {
            if (response.data.data.name) {
                localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(response.data.data));
            }
            return response.data.data;
        });
}

const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_NAME);
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
}

export default AuthService;