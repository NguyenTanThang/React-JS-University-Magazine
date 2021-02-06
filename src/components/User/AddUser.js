import React, { Component } from 'react';
import {Form, Label, Input, FormGroup, CustomInput} from "reactstrap";
import {
    createUser,
    getAllUserRoles,
} from "../../requests";
import {message} from "antd";

class AddUser extends Component {

    state = {
        username: "",
        email: "",
        password: "123456",
        role: "",
        roleText: "",
        userRoles: [],
        faculties: [],
    }

    async componentDidMount() {
        try {
            const data = await getAllUserRoles();
            this.setState({
                userRoles: data.data,
                role: data.data[0]._id,
            })
        } catch (error) {
            console.log(error);
        }
    }

    handleChange = (e) => {
        if (e.target.name == "role") {
            return this.setState({
                [e.target.name]: e.target.value,
                roleText: this.state.userRoles.filter(userRole => {
                    return userRole._id === e.target.value;
                })[0].role
            })
        }
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    renderUserRoleOptions = (e) => {
        const {userRoles} = this.state;

        return userRoles.map(userRole => {
            return (
                <option value={userRole._id} key={userRole._id}>{userRole.role}</option>
            )
        })
    }

    handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const {username, email, password, role} = this.state;
            const createUserData = await createUser({username, email, password, role});

            if (createUserData.success) {
                return message.success(createUserData.message);
            } 

            return message.error(createUserData.message);
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const {handleSubmit, handleChange, renderUserRoleOptions} = this;
        const {username, email, password, roleText, role} = this.state;

        return (
            <div className="add-contribution-container form-container">
                <div className="container">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label htmlFor="username">
                                Username
                            </Label>
                            <Input className="input-control" id="username" name="username" required value={username} onChange={handleChange} placeholder="Username"/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="email">
                                Email
                            </Label>
                            <Input className="input-control" id="email" name="email" required value={email} onChange={handleChange} placeholder="Email"/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="role">
                                Role
                            </Label>
                            <CustomInput className="input-control" type="select" id="role" name="role" required value={role} onChange={handleChange}>
                                {renderUserRoleOptions()}
                            </CustomInput>
                        </FormGroup>
                        
                        <FormGroup>
                            <button type="submit" className="btn btn-custom-primary">Submit</button>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        )
    }
}

export default AddUser;
