import React, { Component } from 'react';
import {AddUser} from "../../components/User";
import {Navbar} from "../../components/Partial";
import {PageHeader} from "antd";

class AddUserPage extends Component {

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
                                    this.props.history.push("/users")
                                }}
                                title={"Add User"}
                                subTitle={``}
                            />
                        </div>
                        <AddUser/>
                    </div>
                </main>
            </div>
        )
    }
}

export default AddUserPage;
