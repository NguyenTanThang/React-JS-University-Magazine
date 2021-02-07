import axios from "axios";
import {PROXY_URL} from "../config/config";
import {authHeader} from "../_helpers";

export const getAllFaculties = async () => {
    try {
        const res = await axios.get(`${PROXY_URL}/faculties`);
        const data = res.data;

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const createFaculty = async (newFac) => {
    try {
        const res = await axios.post(`${PROXY_URL}/faculties/add`, newFac, {
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

export const getFacultyByID = async (facultyID) => {
    try {
        const res = await axios.get(`${PROXY_URL}/faculties/${facultyID}`);
        const data = res.data;

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const editFaculty = async (facID, updatedFac) => {
    try {
        const res = await axios.put(`${PROXY_URL}/faculties/edit/${facID}`, updatedFac, {
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

export const deleteFaculty = async (facID) => {
    try {
        const res = await axios.delete(`${PROXY_URL}/faculties/delete/${facID}`, {
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

