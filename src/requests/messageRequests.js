import axios from "axios";
import {PROXY_URL} from "../config/config";

export const getAllMessagesByRoomID = async (roomID) => {
    try {
        const res = await axios.get(`${PROXY_URL}/messages/roomID/${roomID}`);
        const data = res.data;

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const addMessage = async (roomID, authorID, content) => {
    try {
        const res = await axios.post(`${PROXY_URL}/messages/add`, {
            room: roomID, author: authorID, content
        });
        const data = res.data;
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}
