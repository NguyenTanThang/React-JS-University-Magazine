import React, { Component } from 'react';
import {Form, Label, Input, CustomInput, FormGroup} from "reactstrap";
import {
    getAllFaculties,
    getAllUsersWithoutAssignment,
    createFacultyAssignment
} from "../../requests";
import {message} from "antd";
import {Role} from "../../_helpers";
import {withRouter} from "react-router-dom";

const validateRoles = (role) => {
    return role === Role.Student || role === Role.Coordinator || role === Role.Guest
}

class AddFacultyAssignment extends Component {

    state = {
        user: "",
        faculty: "",
        users: [],
        faculties: [],
    }

    async componentDidMount() {
        try {
            const data = await getAllUsersWithoutAssignment();
            const facultiesData = await getAllFaculties();
            this.setState({
                users: data.data.filter(user => {
                    return validateRoles(user.role.role)
                }),
                user: data.data[0]._id,
                faculties: facultiesData.data,
                faculty: facultiesData.data[0]._id,
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

    handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const {user, faculty} = this.state;
            const createFacultyAssignmentData = await createFacultyAssignment({user, faculty});
            if (createFacultyAssignmentData.success) {
                message.success(createFacultyAssignmentData.message);
                return this.props.history.push("/faculty-assignments");
            } 

            return message.error(createFacultyAssignmentData.message);
        } catch (error) {
            console.log(error);
        }
    }

    renderUserOptions = (e) => {
        const {users} = this.state;

        return users.map(user => {
            return (
                <option value={user._id} key={user._id}>{user.username} ({user.email})</option>
            )
        })
    }

    renderFacultyOptions = (e) => {
        const {faculties} = this.state;

        return faculties.map(faculty => {
            return (
                <option value={faculty._id} key={faculty._id}>{faculty.name}</option>
            )
        })
    }

    render() {
        const {handleSubmit, handleChange, renderFacultyOptions, renderUserOptions} = this;
        const {user, faculty} = this.state;

        return (
            <div className="add-contribution-container form-container">
                <div className="container">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label htmlFor="user">
                                User
                            </Label>
                            <CustomInput className="input-control" type="select" id="user" name="user" required defaultValue={user} onChange={handleChange}>
                                {renderUserOptions()}
                            </CustomInput>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="faculty">
                                Faculty
                            </Label>
                            <CustomInput className="input-control" type="select" id="faculty" name="faculty" required defaultValue={faculty} onChange={handleChange}>
                                {renderFacultyOptions()}
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

export default withRouter(AddFacultyAssignment);
