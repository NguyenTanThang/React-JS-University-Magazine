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
