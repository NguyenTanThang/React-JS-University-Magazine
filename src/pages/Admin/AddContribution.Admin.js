import React, { Component } from 'react';
import {AddContribution} from "../../components/Contribution";

class AddContributionPage extends Component {

    render() {
        return (
            <div>
                <h2>Upload Contribution</h2>
                <AddContribution/>
            </div>
        )
    }
}

export default AddContributionPage;
