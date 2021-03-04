import React, { Component } from 'react';
import {Form, Label, Input, CustomInput, FormGroup} from "reactstrap";
import {
    createTerm
} from "../../requests";
import {message} from "antd";
import {withRouter} from "react-router-dom";

class AddContribution extends Component {

    state = {
        closureDate: "",
        finalClosureDate: "",
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
            const {closureDate, finalClosureDate, name} = this.state;
            const createTermData = await createTerm({closureDate, finalClosureDate, name});
            if (createTermData.success) {
                message.success(createTermData.message);
                return this.props.history.push("/terms");
            } 

            return message.error(createTermData.message);
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const {handleSubmit, handleChange} = this;
        const {closureDate, finalClosureDate, name} = this.state;

        return (
            <div className="add-contribution-container form-container">
                <div className="container">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label htmlFor="name">
                                Name
                            </Label>
                            <Input className="input-control" id="name" name="name" required defaultValue={name} onChange={handleChange} placeholder="Term's Name"/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="closureDate">Closure Date</Label>
                            <Input className="input-control"  type="date" id="closureDate" name="closureDate" required onChange={handleChange} value={closureDate}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="finalClosureDate">Final Closure Date</Label>
                            <Input className={`input-control ${!closureDate ? "disabled" : ""}`} type="date" id="finalClosureDate" name="finalClosureDate" required onChange={handleChange} value={finalClosureDate}  min={closureDate}/>
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
