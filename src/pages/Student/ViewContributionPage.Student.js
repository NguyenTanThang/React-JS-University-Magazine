import React, { Component } from 'react';
import {ContributionTable} from "../../components/Contribution";
import {getAllContributions} from "../../requests";
import { message } from "antd";

class ViewContributionPage extends Component {

    state = {
        contributions: []
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

        let actualContributions = contributions.map(contribution => {
            return {
                ...contribution,
                key: contribution._id
            }
        })

        return (
            <div>
                <ContributionTable contributions={actualContributions}/>
            </div>
        )
    }
}

export default ViewContributionPage;
