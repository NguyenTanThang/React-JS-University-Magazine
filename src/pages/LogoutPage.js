import React, { Component } from 'react';
import {authenticationService} from "../_services";

class LogoutPage extends Component {

    componentDidMount() {
        authenticationService.logout();
        this.props.history.push("/login");
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default LogoutPage;
