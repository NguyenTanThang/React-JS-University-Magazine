import React, { Component } from 'react';
import {AddFaculty} from "../../components/Faculty";

class AddFacultyPage extends Component {

    render() {
        return (
            <div>
                <h2>Create Faculty</h2>
                <AddFaculty/>
            </div>
        )
    }
}

export default AddFacultyPage;
