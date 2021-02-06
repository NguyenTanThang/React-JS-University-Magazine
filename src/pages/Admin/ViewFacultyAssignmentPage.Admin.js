import React, { Component } from 'react';
import {FacultyAssignmentTable} from "../../components/FacultyAssignments";
import {getAllFacultyAssignments} from "../../requests";
import { message } from "antd";

class ViewFacultyAssignmentPage extends Component {

    state = {
        facultyAssignments: []
    }
    
    async componentDidMount() {
        try {
            const data = await getAllFacultyAssignments();
            this.setState({
                facultyAssignments: data.data
            })
        } catch (error) {
            console.log(error);
            message.error(error.message);
        }
    }

    render() {
        let {facultyAssignments} = this.state;

        let actualfacultyAssignments = facultyAssignments.map(facultyAssignment => {
            return {
                ...facultyAssignment,
                key: facultyAssignment._id
            }
        })

        return (
            <div>
                <FacultyAssignmentTable facultyAssignments={actualfacultyAssignments}/>
            </div>
        )
    }
}

export default ViewFacultyAssignmentPage;
