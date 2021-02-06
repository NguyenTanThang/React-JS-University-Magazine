import React, { Component } from 'react';
import {AddUser} from "../../components/User";

class AddUserPage extends Component {

    render() {
        return (
            <div>
                <h2>Create User</h2>
                <AddUser/>
            </div>
        )
    }
}

export default AddUserPage;
