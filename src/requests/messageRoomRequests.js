import axios from "axios";
import {PROXY_URL} from "../config/config";

export const getAllMessageRoomsByUserID = async (userID) => {
    try {
        const res = await axios.get(`${PROXY_URL}/message-rooms/get-all/userID/${userID}`);
        const data = res.data;

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getAllMessageRoomBySenderAndReceiver = async (sender, receiver) => {
    try {
        const res = await axios.get(`${PROXY_URL}/message-rooms/sender/${sender}/receiver/${receiver}`);
        const data = res.data;

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const createMessageRoom = async (senderID, receiverID) => {
    try {
        const res = await axios.post(`${PROXY_URL}/message-rooms/add`, {
            sender: senderID, receiver: receiverID
        });
        const data = res.data;

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

