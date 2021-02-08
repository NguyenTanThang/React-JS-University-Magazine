import React, { Component } from 'react';
import {AddUser} from "../../components/User";
import {Navbar} from "../../components/Partial";

class AddUserPage extends Component {

    render() {
        return (
            <div>
                <Navbar/>
                <main>
                    <div className="container">
                        <h2>Create User</h2>
                        <AddUser/>
                    </div>
                </main>
            </div>
        )
    }
}

export default AddUserPage;
