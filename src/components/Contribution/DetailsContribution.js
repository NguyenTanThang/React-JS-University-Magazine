import React, { Component } from 'react';
import {PageHeader} from "antd";
import {withRouter} from "react-router-dom";
import {get_url_extension, parseDateMoment} from "../../utils";
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
                    message.success("Un-nominating successfully")
                } else {
                    message.success("Nominating successfully")
                }
            });
        } else {
            message.error("Something went wrong when trying to nominate/un-nominate the contribution");
        }
    }

    render() {
        const {contributionItem} = this.props;
        const {isSelected} = this.state;
        const {title, docFileURL, imageFileURL, contributor, created_date, last_modified_date} = contributionItem;
        const currentUserRole = authenticationService.currentUserValue.role.role;
        const {nominateButtonHandle} = this;
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
                            <a href={docFileURL} target="__blank" className="btn btn-info">Download</a>
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
