import React, { Component } from 'react';
import {AddTerm} from "../../components/Term";
import {Navbar} from "../../components/Partial";

class AddTermPage extends Component {

    render() {
        return (
            <div>
                <Navbar/>
                <main>
                    <div className="container">
                        <h2>Create Term</h2>
                        <AddTerm/>
                    </div>
                </main>
            </div>
        )
    }
}

export default AddTermPage;
