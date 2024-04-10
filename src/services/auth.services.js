import axios from "axios";
import { LOCAL_STORAGE_NAME, API_URL } from '../utilities/constants'

const register = (credentials) => {
    return axios.post(API_URL + 'auth/customer_register', credentials)
}

const login = async (credentials) => {
    return axios
        .post(API_URL + "auth/customer_login", credentials)
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