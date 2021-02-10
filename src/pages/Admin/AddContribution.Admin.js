import React, { Component } from 'react';
import {AddContribution} from "../../components/Contribution";
import {Navbar} from "../../components/Partial";
import {PageHeader, message} from "antd";
import {authenticationService} from "../../_services";

class AddContributionPage extends Component {

    componentDidMount() {
        const currentFacultyAssignment = authenticationService.currentUserValue.facultyAssignment;
        if (!currentFacultyAssignment) {
            message.error("You have not been assigned to any faculty. Please contact your local university authority for more information.");
            this.props.history.push("/");
        }
    }

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
                                    this.props.history.push("/contributions")
                                }}
                                title={"Add Contribution"}
                                subTitle={``}
                            />
                        </div>
                        <AddContribution/>
                    </div>
                </main>
            </div>
        )
    }
}

export default AddContributionPage;
