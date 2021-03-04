import React, { Component } from 'react';
import {PageHeader} from "antd";
import {withRouter} from "react-router-dom";
import {get_url_extension, parseDateMoment, zipTheFiles} from "../../utils";
import {editContribution} from "../../requests";
import {authenticationService} from "../../_services";
import {FileReviewer} from "../Partial";
import {message} from "antd";

class DetailsContribution extends Component {

    state = {
        isSelected: false
    }

    componentDidMount() {
        const {contributionItem} = this.props;
        const {isSelected} = contributionItem;
        this.setState({
            isSelected
        })
    }

    nominateButtonHandle = async () => {
        const {contributionItem} = this.props;
        const {isSelected} = this.state;
        const editContributionData = await editContribution(contributionItem._id, {isSelected: !isSelected});
        if (editContributionData.success) {
            this.setState({
                isSelected: !isSelected
            }, () => {
                if (this.state.isSelected) {
                    message.success("Nominating successfully")
                } else {
                    message.success("Un-nominating successfully")
                }
            });
        } else {
            message.error(editContributionData.message);
        }
    }

    handleDownload = async () => {
        const {contributionItem} = this.props;
        const {contributor} = contributionItem;
        const currentDateString = parseDateMoment(Date.now());

        let actualContributions = [contributionItem];

        await zipTheFiles(actualContributions, `UoG_Magazine_${currentDateString}_${contributor.email}_${contributionItem.title}.zip`);
    }

    render() {
        const {contributionItem} = this.props;
        const {isSelected} = this.state;
        const {title, docFileURL, imageFileURL, contributor, created_date, last_modified_date} = contributionItem;
        const currentUserRole = authenticationService.currentUserValue.role.role;
        const {nominateButtonHandle, handleDownload} = this;
        const nominationButton = isSelected ? <button className="btn btn-danger" onClick={nominateButtonHandle}>Un-Nominate</button> : <button className="btn btn-success" onClick={nominateButtonHandle}>Nominate</button>;

        return (
            <div className="details-page">
                <div className="page-header">
                    <PageHeader
                        className="site-page-header"
                        onBack={() => {
                            this.props.history.push("/contributions")
                        }}
                        title={title}
                        subTitle={`By ${contributor.username}`}
                    />
                </div>
                <div className="details-page__container">
                    <div className="details-page-container__review">
                        <FileReviewer file={`${docFileURL}`} extension={get_url_extension(docFileURL)}/>
                    </div>
                    <div className="details-page-container__info">
                        <div className="info-item">
                            <h4>Cover Image</h4>
                            <img src={imageFileURL} alt="Cover" className="img-fluid"/>
                        </div>
                        <div className="info-item">
                            <h4>Date</h4>
                            <ul>
                                <li>
                                    <p><b>Created:</b> {parseDateMoment(created_date)}</p>
                                </li>
                                <li>
                                    <p><b>Modified:</b> {parseDateMoment(last_modified_date)}</p>
                                </li>
                            </ul>
                        </div>
                        <div className="info-item">
                            <h4>Download Doc File</h4>
                            <button onClick={handleDownload} className="btn btn-info">Download</button>
                        </div>
                        {currentUserRole === "Coordinator" ? (
                            <div className="info-item">
                                <h4>Nomination</h4>
                                {nominationButton}
                            </div>
                        ) : <></>}
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(DetailsContribution);
