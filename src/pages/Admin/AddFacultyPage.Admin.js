import React, { Component } from 'react';
import {AddFaculty} from "../../components/Faculty";
import {Navbar} from "../../components/Partial";
import {PageHeader} from "antd";

class AddFacultyPage extends Component {

    render() {
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
                                title={"Add Faculty"}
                                subTitle={``}
                            />
                        </div>
                        <AddFaculty/>
                    </div>
                </main>
            </div>
        )
    }
}

export default AddFacultyPage;
