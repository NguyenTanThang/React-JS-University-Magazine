import React, { Component } from 'react';
import {Form, Label, Input, FormGroup} from "reactstrap";
import {
    editTerm
} from "../../requests";
import {message} from "antd";
import {parseDateMomentForInput} from "../../utils/";

class AddContribution extends Component {

    state = {
        name: "",
        closureDate: "",
        finalClosureDate: ""
    }

    componentDidMount() {
        const {termItem} = this.props;
        const {name, closureDate, finalClosureDate} = termItem;
        this.setState({
            name, 
            closureDate: parseDateMomentForInput(closureDate), 
            finalClosureDate: parseDateMomentForInput(finalClosureDate)
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
            const {termItem} = this.props;
            const {name, closureDate, finalClosureDate} = this.state;
            const editTermData = await editTerm(termItem._id, {name, closureDate, finalClosureDate});
            if (editTermData.success) {
                return message.success(editTermData.message);
            } 

            return message.error(editTermData.message);
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
                            <Input className="input-control"  type="date" id="finalClosureDate" name="finalClosureDate" required onChange={handleChange} value={finalClosureDate}/>
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
