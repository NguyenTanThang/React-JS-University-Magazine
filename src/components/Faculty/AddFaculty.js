import React, { Component } from 'react';
import {Form, Label, Input, FormGroup} from "reactstrap";
import {
    createFaculty
} from "../../requests";
import {message} from "antd";

class AddContribution extends Component {

    state = {
        name: "",
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const {name} = this.state;
            const createFacultyData = await createFaculty({name});
            if (createFacultyData.success) {
                return message.success(createFacultyData.message);
            } 

            return message.error(createFacultyData.message);
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
                            <Input className="input-control" id="name" name="name" required defaultValue={name} onChange={handleChange} placeholder="Faculty's Name"/>
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

export default AddContribution;
