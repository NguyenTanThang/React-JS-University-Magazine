import axios from "axios";
import {PROXY_URL} from "../config/config";
import {authHeader} from "../_helpers";
import {message} from "antd";

export const getAllComments = async () => {
    try {
        const res = await axios.get(`${PROXY_URL}/comments`);
        const data = res.data;

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const createComment = async (newComment) => {
    try {
        message.loading("Creating...", 0);

        const res = await axios.post(`${PROXY_URL}/comments/add`, newComment, {
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

export const getCommentsByContributionID = async (contributionID) => {
    try {
        const res = await axios.get(`${PROXY_URL}/comments/contributionID/${contributionID}`);
        const data = res.data;

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}


