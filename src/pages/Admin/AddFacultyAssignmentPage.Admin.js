import React, { Component } from 'react';
import {AddFacultyAssignment} from "../../components/FacultyAssignments";

class AddFacultyAssignmentPage extends Component {

    render() {
        return (
            <div>
                <h2>Create Faculty Assignment</h2>
                <AddFacultyAssignment/>
            </div>
        )
    }
}

export default AddFacultyAssignmentPage;
