import React, { Component } from 'react';
import {EditFacultyAssignment} from "../../components/FacultyAssignments";
import {
    getFacultyAssignmentByID
} from "../../requests";
import {Navbar} from "../../components/Partial";
import {PageHeader} from "antd";

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
                <Navbar/>
                <main>
                    <div className="container">
                        <div className="page-header">
                            <PageHeader
                                className="site-page-header"
                                onBack={() => {
                                    this.props.history.push("/faculty-assignments")
                                }}
                                title={"Edit Faculty Assignment"}
                                subTitle={``}
                            />
                        </div>
                        <EditFacultyAssignment facultyAssignmentItem={facultyAssignmentItem}/>
                    </div>
                </main>
            </div>
        )
    }
}

export default EditFacultyAssignmentPage;
