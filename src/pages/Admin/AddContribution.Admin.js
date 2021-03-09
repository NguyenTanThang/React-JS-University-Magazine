import React, { Component } from 'react';
import {AddContribution} from "../../components/Contribution";
import {Navbar} from "../../components/Partial";
import {PageHeader, message} from "antd";
import {Redirect} from "react-router-dom";
import {authenticationService} from "../../_services";
import {extractQueryString} from "../../utils";

class AddContributionPage extends Component {

    componentDidMount() {
        const currentFacultyAssignment = authenticationService.currentUserValue.facultyAssignment;
        if (!currentFacultyAssignment) {
            message.error("Please specify a term");
            this.props.history.push("/");
        }
    }

    render() {
        const searchQuery = extractQueryString(this.props);
        const {termID} = searchQuery;

        if (!termID) {
            message.error("You have not been assigned to any faculty. Please contact your local university authority for more information.");
            return <Redirect to="/terms"/>
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
                                    this.props.history.push(`/terms`);
                                }}
                                title={"Add Contribution"}
                                subTitle={``}
                            />
                        </div>
                        <AddContribution searchQuery={searchQuery}/>
                    </div>
                </main>
            </div>
        )
    }
}

export default AddContributionPage;
