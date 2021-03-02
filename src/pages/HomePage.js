import React, { Component } from 'react';
import {authenticationService} from "../_services";
import {Role} from "../_helpers";

class HomePage extends Component {

    componentDidMount() {
        const currentRole = authenticationService.currentUserValue.role.role;
        console.log(currentRole)

        switch (currentRole) {
            case Role.Admin:
                this.props.history.push('/reports');
                break;
            case Role.Coordinator:
            case Role.Manager:
            case Role.Student:
                this.props.history.push('/contributions');
                break;
            case Role.Guest:
                this.props.history.push('/contributions');
                break; 
            default:
                //authenticationService.logout();
                break;
        }
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default HomePage;
