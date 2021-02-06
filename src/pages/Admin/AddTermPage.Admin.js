import React, { Component } from 'react';
import {AddTerm} from "../../components/Term";

class AddTermPage extends Component {

    render() {
        return (
            <div>
                <h2>Create Term</h2>
                <AddTerm/>
            </div>
        )
    }
}

export default AddTermPage;
