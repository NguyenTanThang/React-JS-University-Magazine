import React, { Component } from 'react';
import {PageHeader} from "antd";
import {withRouter} from "react-router-dom";
import {get_url_extension, parseDateMoment} from "../../utils";
import {FileReviewer} from "../Partial"

class DetailsContribution extends Component {
    render() {
        const {contributionItem} = this.props;
        const {title, docFileURL, imageFileURL, contributor, created_date, last_modified_date} = contributionItem;

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
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(DetailsContribution);
