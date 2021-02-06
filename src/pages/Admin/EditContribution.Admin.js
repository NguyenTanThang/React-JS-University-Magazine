import React, { Component } from 'react';
import {EditContribution} from "../../components/Contribution";
import {
    getContributionByID
} from "../../requests";

class EditContributionPage extends Component {

    state = {
        contributionItem: ""
    }

    async componentDidMount() {
        const {contributionID} = this.props.match.params;
        const data = await getContributionByID(contributionID);

        this.setState({
            contributionItem: data.data
        })
    }

    render() {
        const {contributionItem} = this.state;

        if (!contributionItem) {
            return (<></>)
        }

        return (
            <div>
                <h2>Edit Contribution</h2>
                <EditContribution contributionItem={contributionItem}/>
            </div>
        )
    }
}

export default EditContributionPage;
