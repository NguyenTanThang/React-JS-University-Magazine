import React, { Component } from 'react';
import {FormGroup, Form, Input} from "reactstrap";
import {uniLogo} from "../img";
import {authenticationService} from "../_services";
import {message} from "antd";

export default class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }

        // redirect to home if already logged in
        if (authenticationService.currentUserValue) { 
            this.props.history.push('/');
            message.error("You are already logged in");
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        try {
            e.preventDefault();
            const {email, password} = this.state;
            authenticationService.login(email, password)
            .then(
                userData => {
                    if (userData.success) {
                        message.success("Successfully logged in");
                        this.props.history.push("/");
                    } else {
                        message.error(userData.message);
                    }
                },
                error => {
                    console.log(error);
                    message.error(error.message);
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const {handleChange, handleSubmit} = this;
        const {email, password} = this.state;

        return (
            <div className="login-page">
                <div className="login-form-container">
                    <div className="login-form-container__logo">
                        <img src={uniLogo} alt="Logo" className="img-fluid"/>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Input id="email" name="email" placeholder="Email" value={email} onChange={handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Input type="password" id="password" name="password" placeholder="Password" value={password} onChange={handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <button type="submit" className="btn btn-custom-primary">Login</button>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        )
    }
}
