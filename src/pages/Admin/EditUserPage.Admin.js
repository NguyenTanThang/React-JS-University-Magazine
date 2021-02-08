import React, { Component } from 'react';
import {EditUser} from "../../components/User";
import {
    getUserByID
} from "../../requests";
import {Navbar} from "../../components/Partial";

class EditUserPage extends Component {

    state = {
        userItem: ""
    }

    async componentDidMount() {
        const {userID} = this.props.match.params;
        const data = await getUserByID(userID);

        this.setState({
            userItem: data.data
        })
    }

    render() {
        const {userItem} = this.state;

        if (!userItem) {
            return (<></>)
        }

        return (
            <div>
                <Navbar/>
                <main>
                    <div className="container">
                        <h2>Edit User</h2>
                        <EditUser userItem={userItem}/>
                    </div>
                </main>
            </div>
        )
    }
}

export default EditUserPage;
