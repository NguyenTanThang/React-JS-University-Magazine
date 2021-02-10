import axios from "axios";
import {PROXY_URL} from "../config/config";
import {authHeader} from "../_helpers";
import {message} from "antd";

export const getAllFacultyAssignments = async () => {
    try {
        const res = await axios.get(`${PROXY_URL}/faculty-assignments`);
        const data = res.data;

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getFacultyAssignmentByID = async (facultyAssignmentID) => {
    try {
        const res = await axios.get(`${PROXY_URL}/faculty-assignments/facultyAssigmentID/${facultyAssignmentID}`);
        const data = res.data;

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const createFacultyAssignment = async (newFacultyAssignment) => {
    try {
        message.loading("Creating...", 0);

        const res = await axios.post(`${PROXY_URL}/faculty-assignments/add`, newFacultyAssignment, {
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

export const editFacultyAssignment = async (facAssID, updatedfacAss) => {
    try {
        message.loading("Updating...", 0);

        const res = await axios.put(`${PROXY_URL}/faculty-assignments/edit/${facAssID}`, updatedfacAss, {
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

export const deleteFacultyAssignment = async (facAssID) => {
    try {
        message.loading("Deleting...", 0);

        const res = await axios.delete(`${PROXY_URL}/faculty-assignments/delete/${facAssID}`, {
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