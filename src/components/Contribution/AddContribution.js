import React, { Component } from 'react';
import {Form, Label, Input, CustomInput, FormGroup} from "reactstrap";
import {
    getAllTerms,
    createContribution,
    uploadImageFirebase,
    uploadDocumentFirebase,
    getFacultyByID,
    getTermByID
} from "../../requests";
import {message} from "antd";
import {
    getFileExtension,
    acceptDocExt,
    acceptImageExt
} from "../../utils";
import {authenticationService} from "../../_services"

class AddContribution extends Component {

    state = {
        term: "",
        docFile: "",
        imageFile: "",
        faculty: "",
        terms: [],
        title: ""
    }

    async componentDidMount() {
        const currentFacultyAssignment = authenticationService.currentUserValue.facultyAssignment;
        const termData = await getAllTerms();
        const facData = await getFacultyByID(currentFacultyAssignment ? currentFacultyAssignment.faculty : "");
        this.setState({
            term: termData.data[0]._id,
            terms: termData.data,
            faculty: facData.data
        })
    }

    renderTermOptions = () => {
        const {terms} = this.state;
        return terms.map(term => {
            return (
                <option value={term._id} key={term._id}>{term.name}</option>
            )
        })
    }

    handleFileChange = (e) => {
        const targetName = e.target.name;
        if (e.target.files.length === 0) {
            return;
        }
        const file = e.target.files[0];
        const fileExt = getFileExtension(file.name);

        if (targetName == "imageFile") {
            if (acceptImageExt(fileExt)) {
                return this.setState({
                    [e.target.name]: file
                })
            }
            message.warning("Cover image can only be PNG, JPEG or JPG file. Although the file's name is visible it will not be uploaded", 5)
        }
        if (targetName == "docFile") {
            if (acceptDocExt(fileExt)) {
                return this.setState({
                    [e.target.name]: file
                })
            }
            message.warning("Document can only be DOC, DOCX or PDF file.  Although the file's name is visible it will not be uploaded", 5)
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
            const currentUser = authenticationService.currentUserValue;
            const {
                term,
                docFile,
                imageFile,
                faculty,
                title
            } = this.state;

            message.loading("Creating...", 0);

            const existedTerm = await getTermByID(term);

            const currentTime = new Date().getTime();
            const closureTime = new Date(existedTerm.closureDate).getTime();

            // To calculate the time difference of two dates 
            const Difference_In_Time = currentTime - closureTime; 
                
            // To calculate the no. of days between two dates 
            const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 

            if (Difference_In_Days >= 14) {
                message.destroy();
                return message.error("This term has reached the closure date for new entries");
            }

            const docFileURL = await uploadDocumentFirebase(docFile);
            const imageFileURL = await uploadImageFirebase(imageFile);

            const createContributionData = await createContribution({
                term,
                docFileURL,
                imageFileURL,
                faculty: faculty._id,
                title,
                contributor: currentUser._id
            });

            if (createContributionData.success) {
                message.destroy();
                return message.success(createContributionData.message);
            } else {
                message.destroy();
                return message.error(createContributionData.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const {renderTermOptions, handleChange, handleFileChange, handleSubmit} = this;
        const {term, faculty, title} = this.state;

        return (
            <div className="add-contribution-container form-container">
                <div className="container">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label htmlFor="title">
                                Title
                            </Label>
                            <Input id="title" className="input-control"  name="title" required value={title} placeholder="Contribution's Title" onChange={handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="term">
                                Term
                            </Label>
                            <CustomInput className="input-control" type="select" id="term" name="term" required defaultValue={term} onChange={handleChange}>
                                {renderTermOptions()}
                            </CustomInput>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="faculty">
                                Faculty
                            </Label>
                            <Input id="faculty" className="input-control"  name="faculty" required value={faculty.name} disabled/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="docFile">Doc File</Label>
                            <CustomInput className="input-control"  type="file" id="docFile" name="docFile" required onChange={handleFileChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="imageFile">Image File</Label>
                            <CustomInput className="input-control"  type="file" id="imageFile" name="imageFile" required onChange={handleFileChange}/>
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
