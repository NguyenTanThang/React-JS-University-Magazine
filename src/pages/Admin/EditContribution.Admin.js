import React, { Component } from 'react';
import {EditContribution} from "../../components/Contribution";
import {
    getContributionByID
} from "../../requests";
import {Navbar} from "../../components/Partial";
import {PageHeader} from "antd";

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
                <Navbar/>
                <main>
                    <div className="container">
                        <div className="page-header">
                            <PageHeader
                                className="site-page-header"
                                onBack={() => {
                                    this.props.history.push("/contributions")
                                }}
                                title={"Edit Contribution"}
                                subTitle={``}
                            />
                        </div>
                        <EditContribution contributionItem={contributionItem}/>
                    </div>
                </main>
            </div>
        )
    }
}

export default EditContributionPage;
