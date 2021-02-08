import React, { Component } from 'react';
import {AddFaculty} from "../../components/Faculty";
import {Navbar} from "../../components/Partial";

class AddFacultyPage extends Component {

    render() {
        return (
            <div>
                <Navbar/>
                <main>
                    <div className="container">
                        <h2>Create Faculty</h2>
                        <AddFaculty/>
                    </div>
                </main>
            </div>
        )
    }
}

export default AddFacultyPage;
