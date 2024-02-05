import axios from "axios";
import { LOCAL_STORAGE_NAME, API_URL } from '../constants/constant'

let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
}

const register = (creds) => {

    return axios.post(API_URL + 'auth/customer-register', creds)
}


const login = async (creds) => {
    return axios
        .post(API_URL + "auth/customer-login", creds)
        .then((response) => {
            return response.data.results;
        });
}

const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_NAME);
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME))?.userData;
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
}

export default AuthService;