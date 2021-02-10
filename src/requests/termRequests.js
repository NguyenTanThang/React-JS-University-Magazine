import axios from "axios";
import {PROXY_URL} from "../config/config";
import {authHeader} from "../_helpers";
import {message} from "antd";

export const getAllTerms = async () => {
    try {
        const res = await axios.get(`${PROXY_URL}/terms`);
        const data = res.data;

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const createTerm = async (newTerm) => {
    try {
        message.loading("Creating...", 0);

        const res = await axios.post(`${PROXY_URL}/terms/add`, newTerm, {
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

export const getTermByID = async (termID) => {
    try {
        const res = await axios.get(`${PROXY_URL}/terms/${termID}`);
        const data = res.data;

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const editTerm = async (termID, updatedTerm) => {
    try {
        message.loading("Updating...", 0);

        const res = await axios.put(`${PROXY_URL}/terms/edit/${termID}`, updatedTerm, {
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

export const deleteTerm = async (termID) => {
    try {
        message.loading("Deleting...", 0);

        const res = await axios.delete(`${PROXY_URL}/terms/delete/${termID}`, {
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