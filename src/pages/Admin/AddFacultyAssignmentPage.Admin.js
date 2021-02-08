import React, { Component } from 'react';
import {AddFacultyAssignment} from "../../components/FacultyAssignments";
import {Navbar} from "../../components/Partial";

class AddFacultyAssignmentPage extends Component {

    render() {
        return (
            <div>
                <Navbar/>
                <main>
                    <div className="container">
                        <h2>Create Faculty Assignment</h2>
                        <AddFacultyAssignment/>
                    </div>
                </main>
            </div>
        )
    }
}

export default AddFacultyAssignmentPage;
