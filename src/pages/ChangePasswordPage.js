import React, { Component } from 'react';
import {FormGroup, Form, Input} from "reactstrap";
import {uniLogo} from "../img";
import {authenticationService} from "../_services";
import {changePassword} from "../requests";
import {message} from "antd";

export default class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newPassword: "",
            oldPassword: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const currentUser = authenticationService.currentUserValue;
            const {newPassword, oldPassword} = this.state;
            const changePasswordData = await changePassword(currentUser._id, oldPassword, newPassword);

            if (changePasswordData.success) {
                message.success("Successfully changed password");
                this.props.history.push("/");
            } else {
                message.error(changePasswordData.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const {handleChange, handleSubmit} = this;
        const {newPassword, oldPassword} = this.state;

        return (
            <div className="login-page">
                <div className="login-form-container">
                    <div className="login-form-container__logo">
                        <img src={uniLogo} alt="Logo" className="img-fluid"/>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Input type="password" id="oldPassword" name="oldPassword" placeholder="Current Password" value={oldPassword} onChange={handleChange} required/>
                        </FormGroup>
                        <FormGroup>
                            <Input type="password" id="newPassword" name="newPassword" placeholder="New Password" value={newPassword} onChange={handleChange} required/>
                        </FormGroup>
                        <FormGroup>
                            <button type="submit" className="btn btn-custom-primary">Change Password</button>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        )
    }
}
