import React, { Component } from 'react';
import {FacultyAssignmentTable} from "../../components/FacultyAssignments";
import {getAllFacultyAssignments} from "../../requests";
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
                <Navbar/>
                <main>
                    <div className="container">
                        <h2>View Faculty Assignment</h2>
                        <Space>
                            <Link to="/faculty-assignments/add" className="btn btn-primary">Add Faculty Assignment</Link>
                        </Space>
                        <FacultyAssignmentTable facultyAssignments={actualfacultyAssignments}/>
                    </div>
                </main>
            </div>
        )
    }
}

export default ViewFacultyAssignmentPage;
