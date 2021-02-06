import axios from "axios";
import {PROXY_URL} from "../config/config";

export const getAllUserRoles = async () => {
    try {
        const res = await axios.get(`${PROXY_URL}/user-roles`);
        const data = res.data;

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}