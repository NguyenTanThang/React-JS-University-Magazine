import React, { Component } from 'react';
import {FacultyAssignmentTable} from "../../components/FacultyAssignments";
import {getAllFacultyAssignments} from "../../requests";
import {authenticationService} from "../../_services";
import {Role} from "../../_helpers";
import { message, Space } from "antd";
import {Link} from "react-router-dom";
import {Navbar} from "../../components/Partial";

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

    deleteFacultyAssignment = (facultyAssignmentID) => {
        this.setState({
            facultyAssignments: this.state.facultyAssignments.filter(facultyAssignment => {
                return facultyAssignment._id !== facultyAssignmentID;
            })
        })
    }

    render() {
        const {deleteFacultyAssignment} = this;
        let {facultyAssignments} = this.state;
        const currentUser = authenticationService.currentUserValue;
        const currentRole = currentUser.role.role;

        let actualfacultyAssignments = facultyAssignments.map(facultyAssignment => {
            return {
                ...facultyAssignment,
                key: facultyAssignment._id
            }
        })

        return (
            <div>
                <Navbar/>
                <main>
                    <div className="container">
                        <h2>View Faculty Assignment</h2>
                        {
                            currentRole === Role.Admin ? (
                                <Space>
                                    <Link to="/faculty-assignments/add" className="btn btn-primary">Add Faculty Assignment</Link>
                                </Space>
                            ) : (<></>)
                        }
                        <FacultyAssignmentTable facultyAssignments={actualfacultyAssignments} deleteFacultyAssignment={deleteFacultyAssignment}/>
                    </div>
                </main>
            </div>
        )
    }
}

export default ViewFacultyAssignmentPage;
