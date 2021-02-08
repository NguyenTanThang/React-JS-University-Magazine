import React, { Component } from 'react';
import {AddContribution} from "../../components/Contribution";
import {Navbar} from "../../components/Partial";

class AddContributionPage extends Component {

    render() {
        return (
            <div>
                <Navbar/>
                <main>
                    <div className="container">
                        <h2>Upload Contribution</h2>
                        <AddContribution/>
                    </div>
                </main>
            </div>
        )
    }
}

export default AddContributionPage;
