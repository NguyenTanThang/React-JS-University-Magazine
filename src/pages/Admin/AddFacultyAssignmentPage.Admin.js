import React, { Component } from 'react';
import {AddFacultyAssignment} from "../../components/FacultyAssignments";
import {Navbar} from "../../components/Partial";
import {PageHeader} from "antd";

class AddFacultyAssignmentPage extends Component {

    render() {
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
                                title={"Add Faculty Assignment"}
                                subTitle={``}
                            />
                        </div>
                        <AddFacultyAssignment/>
                    </div>
                </main>
            </div>
        )
    }
}

export default AddFacultyAssignmentPage;
