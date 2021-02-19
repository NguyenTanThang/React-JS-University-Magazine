import axios from "axios";
import {PROXY_URL} from "../config/config";
import {authHeader} from "../_helpers";
import {message} from "antd";

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

export const changePassword = async (userID, oldPassword, newPassword) => {
    try {
        message.loading("Updating...", 0);

        const res = await axios.put(`${PROXY_URL}/users/change-password/${userID}`, {oldPassword, newPassword}, {
            headers: {
                ...authHeader()
            }
        });
        const data = res.data;
        message.destroy();

        return data;
    } catch (error) {
        message.destroy();
        message.error(error.message);
        console.log(error);
        return null;
    }
}

export const getAllUsersWithoutAssignment = async () => {
    try {
        const res = await axios.get(`${PROXY_URL}/users/without-assignment`, {
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
        const res = await axios.get(`${PROXY_URL}/users/userID/${userID}`, {
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
        message.loading("Creating...", 0);

        const res = await axios.post(`${PROXY_URL}/users/add`, newUser, {
            headers: {
                ...authHeader()
            }
        });
        const data = res.data;

        message.destroy();

        return data;
    } catch (error) {
        message.destroy();
        message.error(error.message);
        console.log(error);
        return null;
    }
}

export const editUser = async (userID, updatedUser) => {
    try {
        message.loading("Updating...", 0);

        const res = await axios.put(`${PROXY_URL}/users/edit/${userID}`, updatedUser, {
            headers: {
                ...authHeader()
            }
        });
        const data = res.data;
        message.destroy();

        return data;
    } catch (error) {
        message.destroy();
        message.error(error.message);
        console.log(error);
        return null;
    }
}
