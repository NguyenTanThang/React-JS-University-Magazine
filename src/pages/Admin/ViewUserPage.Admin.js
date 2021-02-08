import React, { Component } from 'react';
import {UserTable} from "../../components/User";
import {getAllUsers} from "../../requests";
import { message, Space } from "antd";
import {Link} from "react-router-dom";
import {Navbar} from "../../components/Partial";

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
                <Navbar/>
                <main>
                    <div className="container">
                        <h2>View Users</h2>
                        <Space>
                            <Link to="/users/add" className="btn btn-primary">Add User</Link>
                        </Space>
                        <UserTable users={actualUsers}/>
                    </div>
                </main>
            </div>
        )
    }
}

export default ViewUserPage;
