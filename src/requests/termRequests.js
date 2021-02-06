import axios from "axios";
import {PROXY_URL} from "../config/config";

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
        const res = await axios.post(`${PROXY_URL}/terms/add`, newTerm);
        const data = res.data;

        return data;
    } catch (error) {
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
        const res = await axios.put(`${PROXY_URL}/terms/edit/${termID}`, updatedTerm);
        const data = res.data;

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}