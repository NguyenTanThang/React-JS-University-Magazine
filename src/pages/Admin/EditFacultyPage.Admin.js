import React, { Component } from 'react';
import {EditFaculty} from "../../components/Faculty";
import {
    getFacultyByID
} from "../../requests";
import {Navbar} from "../../components/Partial";

class EditFacultyPage extends Component {

    state = {
        facultyItem: ""
    }

    async componentDidMount() {
        const {facultyID} = this.props.match.params;
        const data = await getFacultyByID(facultyID);

        this.setState({
            facultyItem: data.data
        })
    }

    render() {
        const {facultyItem} = this.state;

        if (!facultyItem) {
            return (<></>)
        }

        return (
            <div>
                <Navbar/>
                <main>
                    <div className="container">
                        <h2>Edit Faculty</h2>
                        <EditFaculty facultyItem={facultyItem}/>
                    </div>
                </main>
            </div>
        )
    }
}

export default EditFacultyPage;
