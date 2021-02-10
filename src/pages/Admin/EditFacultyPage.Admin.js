import React, { Component } from 'react';
import {EditFaculty} from "../../components/Faculty";
import {
    getFacultyByID
} from "../../requests";
import {Navbar} from "../../components/Partial";
import {PageHeader} from "antd";

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
                        <div className="page-header">
                            <PageHeader
                                className="site-page-header"
                                onBack={() => {
                                    this.props.history.push("/faculties")
                                }}
                                title={"Edit Faculty"}
                                subTitle={``}
                            />
                        </div>
                        <EditFaculty facultyItem={facultyItem}/>
                    </div>
                </main>
            </div>
        )
    }
}

export default EditFacultyPage;
