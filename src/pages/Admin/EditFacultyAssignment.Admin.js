import React, { Component } from 'react';
import {EditFacultyAssignment} from "../../components/FacultyAssignments";
import {
    getFacultyAssignmentByID
} from "../../requests";

class EditFacultyAssignmentPage extends Component {

    state = {
        facultyAssignmentItem: ""
    }

    async componentDidMount() {
        const {facultyAssignmentID} = this.props.match.params;
        const data = await getFacultyAssignmentByID(facultyAssignmentID);

        this.setState({
            facultyAssignmentItem: data.data
        })
    }

    render() {
        const {facultyAssignmentItem} = this.state;

        if (!facultyAssignmentItem) {
            return (<></>)
        }

        return (
            <div>
                <h2>Edit Faculty Assignment</h2>
                <EditFacultyAssignment facultyAssignmentItem={facultyAssignmentItem}/>
            </div>
        )
    }
}

export default EditFacultyAssignmentPage;
