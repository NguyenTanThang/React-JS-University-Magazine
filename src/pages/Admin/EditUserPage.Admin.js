import React, { Component } from 'react';
import {EditUser} from "../../components/User";
import {
    getUserByID
} from "../../requests";
import {Navbar} from "../../components/Partial";
import {PageHeader} from "antd";

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
                        <div className="page-header">
                            <PageHeader
                                className="site-page-header"
                                onBack={() => {
                                    this.props.history.push("/terms")
                                }}
                                title={"Edit User"}
                                subTitle={``}
                            />
                        </div>
                        <EditUser userItem={userItem}/>
                    </div>
                </main>
            </div>
        )
    }
}

export default EditUserPage;
