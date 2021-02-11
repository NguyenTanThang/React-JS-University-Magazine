import React, { Component } from 'react';
import {DetailsContribution} from "../../components/Contribution";
import {CommentList} from "../../components/Comment";
import {
    getContributionByID,
    getCommentsByContributionID
} from "../../requests";
import {Navbar} from "../../components/Partial";

class ViewContributionPage extends Component {

    state = {
        contributionItem: "",
        comments: ""
    }

    async componentDidMount() {
        const {contributionID} = this.props.match.params;
        const data = await getContributionByID(contributionID);
        const getCommentsByContributionIDData = await getCommentsByContributionID(contributionID);

        this.setState({
            contributionItem: data.data,
            comments: getCommentsByContributionIDData.data
        })
    }

    render() {
        const {contributionItem, comments} = this.state;
        const {contributionID} = this.props.match.params;

        if (!contributionItem || !comments) {
            return (<></>)
        }

        return (
            <div>
                <Navbar/>
                <main>
                    <div className="container">
                        <DetailsContribution contributionItem={contributionItem}/>
                        <CommentList comments={comments} contributionID={contributionID}/>
                    </div>
                </main>
            </div>
        )
    }
}

export default ViewContributionPage;
