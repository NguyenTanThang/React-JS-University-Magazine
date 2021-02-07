import React, { Component } from 'react';
import {Form, Label, Input, FormGroup, CustomInput} from "reactstrap";
import {
    editUser,
    getAllUserRoles
} from "../../requests";
import {message} from "antd";

class EditUser extends Component {

    state = {
        username: "",
        role: "",
        userRoles: []
    }

    async componentDidMount() {
        try {
            const {userItem} = this.props;
            const {username} = userItem;
            const data = await getAllUserRoles();
            this.setState({
                userRoles: data.data,
                role: data.data.filter(roleItem => {
                    return roleItem._id === userItem.role._id;
                })[0]._id,
                username,
            })
        } catch (error) {
            console.log(error);
        }
    }

    handleChange = (e) => {
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
            const {userItem} = this.props;
            const {username, role} = this.state;
            const editUserData = await editUser(userItem._id, {username, role});

            if (editUserData.success) {
                return message.success(editUserData.message);
            } 

            return message.error(editUserData.message);
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const {handleSubmit, handleChange, renderUserRoleOptions} = this;
        const {username, role} = this.state;

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

export default EditUser;
