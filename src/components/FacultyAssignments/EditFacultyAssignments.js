import React, { Component } from 'react';
import {Form, Label, Input, CustomInput, FormGroup} from "reactstrap";
import {
    getAllFaculties,
    getUserByID,
    editFacultyAssignment
} from "../../requests";
import {message} from "antd";

class EditFacultyAssignment extends Component {

    state = {
        user: "",
        faculty: "",
        faculties: [],
    }

    async componentDidMount() {
        try {
            const {facultyAssignmentItem} = this.props;
            const facultyAssignmentUser = facultyAssignmentItem.user;
            const facultyAssignmentFac = facultyAssignmentItem.faculty;

            const data = await getUserByID(facultyAssignmentUser._id);
            const facultiesData = await getAllFaculties();
            this.setState({
                user: data.data,
                faculties: facultiesData.data,
                faculty: facultiesData.data.filter(fac => {
                    return fac._id === facultyAssignmentFac._id
                })[0]._id,
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
            const {facultyAssignmentItem} = this.props;
            const {user, faculty} = this.state;
            const editFacultyAssignmentData = await editFacultyAssignment(facultyAssignmentItem._id, {user, faculty});
            if (editFacultyAssignmentData.success) {
                return message.success(editFacultyAssignmentData.message);
            } 

            return message.error(editFacultyAssignmentData.message);
        } catch (error) {
            console.log(error);
        }
    }

    renderUserOptions = (e) => {
        const {user} = this.state;

            return (
                <option value={user._id} key={user._id}>{user.username} ({user.email})</option>
            )
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
                            <CustomInput className="input-control" type="select" id="user" name="user" required defaultValue={user} onChange={handleChange} disabled>
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

export default EditFacultyAssignment;
