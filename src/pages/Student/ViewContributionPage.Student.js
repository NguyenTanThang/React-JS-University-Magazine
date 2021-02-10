import React, { Component } from 'react';
import {ContributionTable} from "../../components/Contribution";
import {getAllContributions} from "../../requests";
import { message, Space } from "antd";
import {Link} from "react-router-dom";
import {Navbar} from "../../components/Partial";
import {authenticationService} from "../../_services";
import {Role} from "../../_helpers";

const filterContributionByRole = (contributions) => {
    const currentRole = authenticationService.currentUserValue.role.role;
    const currentUser = authenticationService.currentUserValue;
    
    let ans = contributions;
    
    switch (currentRole) {
        case Role.Student:
            ans = contributions.filter(contribution => {
                return contribution.contributor.email === currentUser.email
            });
            break;
        case Role.Manager:
            ans = contributions.filter(contribution => {
                return contribution.isSelected
            });
            break;
        case Role.Coordinator:
        case Role.Guest:
            const currentFacultyAssignment = authenticationService.currentUserValue.facultyAssignment;
            if (!currentFacultyAssignment) {
                message.destroy();
                message.error("You have not been assigned to a faculty yet. Please contact your local university authority for more information.");
                ans = []
            } else {
                ans = contributions.filter(contribution => {
                    return contribution.isSelected
                });
            }
            
            break;
        default:
            break;
    }

    return ans;
}

class ViewContributionPage extends Component {

    state = {
        contributions: [],
    }
    
    async componentDidMount() {
        try {
            const data = await getAllContributions();
            this.setState({
                contributions: data.data
            })
        } catch (error) {
            console.log(error);
            message.error(error.message);
        }
    }

    render() {
        let {contributions} = this.state;
        let actualContributions = contributions;

        actualContributions = filterContributionByRole(actualContributions)
        actualContributions = actualContributions.map(contribution => {
            return {
                ...contribution,
                key: contribution._id
            }
        })

        return (
            <div>
                <Navbar/>
                <main>
                    <div className="container">
                        <h2>View Contributions</h2>
                        <Space>
                            <Link to="/contributions/add" className="btn btn-primary">Upload Contribution</Link>
                        </Space>
                        <ContributionTable contributions={actualContributions}/>
                    </div>
                </main>
            </div>
        )
    }
}

export default ViewContributionPage;
