import React, { Component } from 'react';
import {UserTable} from "../../components/User";
import {getAllUsers} from "../../requests";
import { message } from "antd";

class ViewUserPage extends Component {

    state = {
        users: []
    }
    
    async componentDidMount() {
        try {
            const data = await getAllUsers();
            this.setState({
                users: data.data
            })
        } catch (error) {
            console.log(error);
            message.error(error.message);
        }
    }

    render() {
        let {users} = this.state;

        let actualUsers = users.map(user => {
            return {
                ...user,
                key: user._id
            }
        })

        return (
            <div>
                <UserTable users={actualUsers}/>
            </div>
        )
    }
}

export default ViewUserPage;
