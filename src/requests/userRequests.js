import axios from "axios";
import {PROXY_URL} from "../config/config";
import {authHeader} from "../_helpers";

export const getAllUsers = async () => {
    try {
        const res = await axios.get(`${PROXY_URL}/users`, {
            headers: {
                ...authHeader()
            }
        });
        const data = res.data;

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getUserByID = async (userID) => {
    try {
        const res = await axios.get(`${PROXY_URL}/users/${userID}`, {
            headers: {
                ...authHeader()
            }
        });
        const data = res.data;

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const createUser = async (newUser) => {
    try {
        const res = await axios.post(`${PROXY_URL}/users/add`, newUser, {
            headers: {
                ...authHeader()
            }
        });
        const data = res.data;

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const editUser = async (userID, updatedUser) => {
    try {
        const res = await axios.put(`${PROXY_URL}/users/edit/${userID}`, updatedUser, {
            headers: {
                ...authHeader()
            }
        });
        const data = res.data;

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}
