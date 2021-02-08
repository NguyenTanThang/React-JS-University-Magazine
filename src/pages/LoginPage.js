import React, { Component } from 'react';
import {FormGroup, Form, Input} from "reactstrap";
import {uniLogo} from "../img";
import {authenticationService} from "../_services";

export default class LoginPage extends Component {

    state = {
        email: "",
        password: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        authenticationService.login(email, password);
        this.props.history.push("/");
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
