import React, { Component } from 'react';
import {ContributionTable} from "../../components/Contribution";
import {getAllContributions} from "../../requests";
import {zipTheFiles, extractQueryString} from "../../utils";
import { message, Space, PageHeader } from "antd";
import {Navbar} from "../../components/Partial";
import {authenticationService} from "../../_services";
import {Role} from "../../_helpers";

const filterContributionByRole = (contributions, termID) => {
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
            const currentFacultyAssignment = authenticationService.currentUserValue.facultyAssignment;
            if (!currentFacultyAssignment) {
                message.destroy();
                message.error("You have not been assigned to a faculty yet. Please contact your local university authority for more information.");
                ans = []
            } else {
                ans = contributions.filter(contribution => {
                    return contribution.faculty._id === currentFacultyAssignment.faculty;
                });
            }
            break;
        case Role.Guest:
            const guestCurrentFacultyAssignment = authenticationService.currentUserValue.facultyAssignment;
            if (!guestCurrentFacultyAssignment) {
                message.destroy();
                message.error("You have not been assigned to a faculty yet. Please contact your local university authority for more information.");
                ans = []
            } else {
                ans = contributions.filter(contribution => {
                    return contribution.faculty._id === guestCurrentFacultyAssignment.faculty;
                });
                ans = ans.filter(contribution => {
                    return contribution.isSelected
                });
            }
            break;
        default:
            break;
    }

    if (termID) {
        ans = ans.filter(contribution => {
            return contribution.term._id === termID;
        })
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

    deleteContribution = (contributionID) => {
        this.setState({
            contributions: this.state.contributions.filter(contribution => {
                return contribution._id !== contributionID;
            })
        })
    }

    handleDownloadAll = async () => {
        let {contributions} = this.state;
        let actualContributions = contributions;

        actualContributions = filterContributionByRole(actualContributions)
   
        await zipTheFiles(actualContributions);
    }

    renderUtilsBox = () => {
        const {handleDownloadAll} = this;
        const currentUser = authenticationService.currentUserValue;
        const currentRole = currentUser.role.role;

        if (currentRole === Role.Student) {
            return (
                <></>
            )
        } else if (currentRole === Role.Manager) {
            return (
                <Space>
                    <button className="btn btn-primary" onClick={handleDownloadAll}>Download All</button>
                </Space>
            )
        }
    }

    render() {
        const {deleteContribution} = this;
        let {contributions} = this.state;
        const {renderUtilsBox} = this;
        let actualContributions = contributions;
        const searchQuery = extractQueryString(this.props);
        const {termID} = searchQuery;

        actualContributions = filterContributionByRole(actualContributions, termID)
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
                        {
                            termID ? (
                                <div className="page-header">
                                    <PageHeader
                                        className="site-page-header"
                                        onBack={() => {
                                            this.props.history.push("/terms")
                                        }}
                                        title={"View Contributions in Term"}
                                        subTitle={``}
                                    />
                                </div>
                            ) : (
                                <h2>View Contributions</h2>
                            )
                        }
                        
                        {
                            renderUtilsBox()
                        }
                        <ContributionTable contributions={actualContributions} deleteContribution={deleteContribution}/>
                    </div>
                </main>
            </div>
        )
    }
}

export default ViewContributionPage;
