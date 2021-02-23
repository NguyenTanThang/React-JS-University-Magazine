import axios from "axios";
import {PROXY_URL} from "../config/config";
import {
    uploadDocumentFirebase,
    uploadImageFirebase
} from "./";
import {authHeader} from "../_helpers";
import {message} from "antd";

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

export const getNumberOfContributionsReport = async () => {
    try {
        const res = await axios.get(`${PROXY_URL}/contributions/number-of-contributions-report`);
        const data = res.data;

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getAllContributionsWithoutComment = async () => {
    try {
        const res = await axios.get(`${PROXY_URL}/contributions/contributions-without-comment-report`);
        const data = res.data;

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getNumberOfContributorsReport = async () => {
    try {
        const res = await axios.get(`${PROXY_URL}/contributions/number-of-contributors-report`);
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
            ...newContribution
        }, {
            headers: {
                ...authHeader()
            }
        });
        const data = res.data;

        return data;
    } catch (error) {
        message.destroy();
        message.error(error.message);
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
        message.loading("Updating...", 0);

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

        message.destroy();
        return data;
    } catch (error) {
        message.destroy();
        message.error(error.message);
        console.log(error);
        return null;
    }
}

export const deleteContribution = async (contributionID) => {
    try {
        message.loading("Deleting...", 0);

        const res = await axios.delete(`${PROXY_URL}/contributions/delete/${contributionID}`, {
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