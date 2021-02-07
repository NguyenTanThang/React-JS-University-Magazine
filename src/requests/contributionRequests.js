import axios from "axios";
import {PROXY_URL} from "../config/config";
import {
    uploadDocumentFirebase,
    uploadImageFirebase
} from "./";
import {authHeader} from "../_helpers";

export const getAllContributions = async () => {
    try {
        const res = await axios.get(`${PROXY_URL}/contributions`);
        const data = res.data;

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const createContribution = async (newContribution) => {
    try {
        const res = await axios.post(`${PROXY_URL}/contributions/add`, {
            ...newContribution,
            contributor: "601269a3772e8b310084bb18"
        }, {
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

export const getContributionByID = async (contributionID) => {
    try {
        const res = await axios.get(`${PROXY_URL}/contributions/contributionID/${contributionID}`);
        const data = res.data;

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const editContribution = async (contributionID, updatedContribution) => {
    try {
        const {docFile, imageFile} = updatedContribution;

        if (docFile) {
            const docFileURL = await uploadDocumentFirebase(docFile);
            updatedContribution = {
                ...updatedContribution,
                docFileURL
            }
        }
        if (imageFile) {
            const imageFileURL = await uploadImageFirebase(imageFile);
            updatedContribution = {
                ...updatedContribution,
                imageFileURL
            }
        }
        
        const res = await axios.put(`${PROXY_URL}/contributions/edit/${contributionID}`, {
            ...updatedContribution
        }, {
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

export const deleteContribution = async (contributionID) => {
    try {
        const res = await axios.delete(`${PROXY_URL}/contributions/delete/${contributionID}`, {
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