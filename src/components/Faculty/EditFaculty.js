import React, { Component } from 'react';
import {Form, Label, Input, FormGroup} from "reactstrap";
import {
    editFaculty
} from "../../requests";
import {message} from "antd";
import {withRouter} from "react-router-dom";

class AddContribution extends Component {

    state = {
        name: "",
    }

    componentDidMount() {
        const {facultyItem} = this.props;
        const {name} = facultyItem;
        this.setState({
            name
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const {facultyItem} = this.props;
            const {name} = this.state;
            const editFacultyData = await editFaculty(facultyItem._id, {name});
            if (editFacultyData.success) {
                message.success(editFacultyData.message);
                return this.props.history.push("/faculties");
            } 

            return message.error(editFacultyData.message);
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const {handleSubmit, handleChange} = this;
        const {name} = this.state;

        return (
            <div className="add-contribution-container form-container">
                <div className="container">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label htmlFor="name">
                                Name
                            </Label>
                            <Input className="input-control" id="name" name="name" required value={name} onChange={handleChange} placeholder="Faculty's Name"/>
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

export default withRouter(AddContribution);
