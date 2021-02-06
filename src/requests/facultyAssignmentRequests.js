import axios from "axios";
import {PROXY_URL} from "../config/config";

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
        const res = await axios.post(`${PROXY_URL}/faculty-assignments/add`, newFacultyAssignment);
        const data = res.data;

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const editFacultyAssignment = async (facAssID, updatedfacAss) => {
    try {
        const res = await axios.put(`${PROXY_URL}/faculty-assignments/edit/${facAssID}`, updatedfacAss);
        const data = res.data;

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}