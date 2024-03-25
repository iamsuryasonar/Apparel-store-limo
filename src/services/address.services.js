import axios from "axios";
import { LOCAL_STORAGE_NAME, API_URL } from '../constants/constant'

const getheaders = () => {
    const headers = {
        "Accept": "*/*",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)).accessToken}`
    }
    return headers
}

const getAllAddresses = async () => {
    const response = await axios
        .get(API_URL + 'address/', { headers: getheaders() })
    return response.data.results
}

const addAddress = async (data) => {
    const response = await axios
        .post(API_URL + 'address/', data, { headers: getheaders() })
    return response.data.results
}

const updateAddress = async (data) => {
    const response = await axios
        .put(API_URL + 'address/' + data._id, data, { headers: getheaders() })
    return response.data.results
}

const removeAddress = async (data) => {
    const response = await axios
        .delete(API_URL + 'address/' + data.id, { headers: getheaders() })
    return response.data.results
}

const AddressServices = {
    getAllAddresses,
    addAddress,
    updateAddress,
    removeAddress
}

export default AddressServices;