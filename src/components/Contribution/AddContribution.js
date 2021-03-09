import React, { Component } from 'react';
import {Form, Label, Input, CustomInput, FormGroup} from "reactstrap";
import {
    createContribution,
    uploadImageFirebase,
    uploadDocumentFirebase,
    getFacultyByID,
    getTermByID,
} from "../../requests";
import {message} from "antd";
import {
    getFileExtension,
    acceptDocExt,
    acceptImageExt,
    calculateKB,
    calculateMB,
    createNotification,
    calculateDaysDiff
} from "../../utils";
import {authenticationService} from "../../_services";
import {withRouter} from "react-router-dom";

class AddContribution extends Component {

    state = {
        term: "",
        docFile: "",
        imageFile: "",
        faculty: "",
        title: ""
    }

    async componentDidMount() {
        const currentFacultyAssignment = authenticationService.currentUserValue.facultyAssignment;
        const {searchQuery} = this.props;
        const {termID} = searchQuery
        const facData = await getFacultyByID(currentFacultyAssignment ? currentFacultyAssignment.faculty : "");
        this.setState({
            term: termID,
            faculty: facData.data
        })
    }

    handleFileChange = (e) => {
        const targetName = e.target.name;
        if (e.target.files.length === 0) {
            return;
        }
        const file = e.target.files[0];
        const fileSize = e.target.files[0].size;
        const fileExt = getFileExtension(file.name);

        if (targetName == "imageFile") {

            if (fileSize < calculateKB(1) || fileSize > calculateMB(20)) {
                return createNotification("warning", {
                    message: "File Size",
                    description: "We only accept file that are above 1KB and below 20MB. Although the file's name is visible it will not be uploaded"
                });
            }

            if (acceptImageExt(fileExt)) {
                return this.setState({
                    [e.target.name]: file
                })
            } else {
                this.setState({
                    [e.target.name]: ""
                })
            }
            message.warning("Cover image can only be PNG, JPEG or JPG file. Although the file's name is visible it will not be uploaded", 5);
        }
        if (targetName == "docFile") {

            if (fileSize < calculateKB(20) || fileSize > calculateMB(20)) {
                return createNotification("warning", {
                    message: "File Size",
                    description: "We only accept file that are above 20KB and below 20MB. Although the file's name is visible it will not be uploaded"
                });
            }

            if (acceptDocExt(fileExt)) {
                return this.setState({
                    [e.target.name]: file
                })
            } else {
                this.setState({
                    [e.target.name]: ""
                })
            }
            message.warning("Document can only be DOCX or PDF file. Although the file's name is visible it will not be uploaded", 5);
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
                title,
                agree
            } = this.state;

            message.loading("Creating...", 0);

            if (!agree) {
                message.destroy();
                return createNotification("error", {
                    message: "Terms & Conditions",
                    description: "You are required to agree to the terms and conditions before any submissions"
                });
            }

            if (!docFile) {
                message.destroy();
                return createNotification("error", {
                    message: "Document File",
                    description: "Please check the document file input. You may entered have the wrong type of file or file which is lower than 20KB or larger than 20MB"
                });
            }

            if (!imageFile) {
                message.destroy();
                return createNotification("error", {
                    message: "Image File",
                    description: "Please check the image file input. You may entered have the wrong type of file or file which is lower than 1KB or larger than 20MB"
                });
            }

            const existedTerm = await getTermByID(term);

            const dayDiffBool = calculateDaysDiff(existedTerm, 0);

            if (dayDiffBool) {
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
                message.success(createContributionData.message);
                return this.props.history.push(`/contributions?termID=${term}`);
            } else {
                message.destroy();
                return message.error(createContributionData.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const {handleChange, handleFileChange, handleSubmit} = this;
        const {faculty, title} = this.state;

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
                            <Label htmlFor="faculty">
                                Faculty
                            </Label>
                            <Input id="faculty" className="input-control"  name="faculty" required value={faculty.name} disabled/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="docFile">Document File (docx, pdf)</Label>
                            <CustomInput className="input-control"  type="file" id="docFile" name="docFile" required onChange={handleFileChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="imageFile">Image File</Label>
                            <CustomInput className="input-control"  type="file" id="imageFile" name="imageFile" required onChange={handleFileChange}/>
                        </FormGroup>
                        <FormGroup className="add-contribution-terms">
                            <p>I confirm that what I am about to upload is my own work and that it has not, in whole or part, been presented elsewhere for assessment. In addition, I confirm that</p>
                            <ul>
                                <li>
                                All material which has been copied has been clearly identified as such by being placed inside quotation marks and a full reference to the source has been provided
                                </li>
                                <li>
                                Any material which has been referred to or adapted has been clearly identified and a full reference to the source has been provided
                                </li>
                                <li>
                                Any work not in quotation marks is in my own words
                                </li>
                                <li>
                                I have not shared my work with any other student
                                </li>
                                <li>
                                I have not taken work from any other student
                                </li>
                                <li>
                                I have not paid anyone to do my work or employed the services of an essay or code writing agency
                                </li>
                            </ul>
                            <p>Where material has been used from other sources it has been properly acknowledged in accordance with the University's Regulations regarding Cheating and Plagiarism.</p>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input type="checkbox" id="agree" name="agree" required onChange={handleChange}/>{' '}
                            I agree to the terms and conditions of the Unversity
                            </Label>
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
