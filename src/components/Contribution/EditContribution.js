import React, { Component } from 'react';
import {Form, Label, Input, CustomInput, FormGroup} from "reactstrap";
import {
    getAllTerms,
    editContribution,
    getTermByID,
    getFacultyByID
} from "../../requests";
import {message} from "antd";
import {
    getFileExtension,
    acceptDocExt,
    acceptImageExt,
    calculateKB,
    calculateMB
} from "../../utils";
import {withRouter} from "react-router-dom";

class EditContribution extends Component {

    state = {
        term: "",
        docFile: "",
        imageFile: "",
        faculty: "",
        terms: [],
        title: ""
    }

    async componentDidMount() {
        const {contributionItem} = this.props;
        const termData = await getAllTerms();
        const facData = await getFacultyByID(contributionItem.faculty._id);
        this.setState({
            term: contributionItem.term._id,
            terms: termData.data,
            faculty: facData.data,
            title: contributionItem.title
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
        const fileSize = e.target.files[0].size
        const fileExt = getFileExtension(file.name);

        if (targetName == "imageFile") {
            if (fileSize < calculateKB(1) || fileSize > calculateMB(20)) {
                return message.warning("We only accept file that are above 1KB and below 20MB. Although the file's name is visible it will not be uploaded", 5);
            }
            if (acceptImageExt(fileExt)) {
                return this.setState({
                    [e.target.name]: file
                })
            }
            message.warning("Cover image can only be PNG, JPEG or JPG file. Although the file's name is visible it will not be uploaded", 5)
        }
        if (targetName == "docFile") {
            if (fileSize < calculateKB(20) || fileSize > calculateMB(20)) {
                return message.warning("We only accept file that are above 20KB and below 20MB. Although the file's name is visible it will not be uploaded", 5);
            }
            if (acceptDocExt(fileExt)) {
                return this.setState({
                    [e.target.name]: file
                })
            }
            message.warning("Document can only be DOCX or PDF file.  Although the file's name is visible it will not be uploaded", 5)
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
            message.loading("Updating...", 0);
            const {contributionItem} = this.props;
            const {
                docFile,
                imageFile,
                faculty,
                title
            } = this.state;

            /*
            if (!docFile) {
                message.destroy();
                return message.error("Please check the doc file input. You may entered have the wrong type of file or an empty file");
            }

            if (!imageFile) {
                message.destroy();
                return message.error("Please check the image file input. You may have entered the wrong type of file or an empty file");
            }
            */

            let updatedContribution = {
                faculty: faculty._id,
                title,
                docFile,
                imageFile
            };
            
            const term = contributionItem.term._id;

            const existedTerm = await getTermByID(term);

            const currentTime = new Date().getTime();
            const closureTime = new Date(existedTerm.finalClosureDate).getTime();

            // To calculate the time difference of two dates 
            const Difference_In_Time = currentTime - closureTime; 
                
            // To calculate the no. of days between two dates 
            const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 

            if (Difference_In_Days >= 14) {
                message.destroy();
                return message.error("This term has reached the final closure date for any modification");
            }

            const editContributionData = await editContribution(contributionItem._id, updatedContribution);
            if (editContributionData.success) {
                message.success(editContributionData.message);
                return this.props.history.push("/contributions");
            } 
            
            return message.error(editContributionData.message);
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
                        {/*
                        <FormGroup>
                            <Label htmlFor="term">
                                Term
                            </Label>
                            <CustomInput className="input-control" type="select" id="term" name="term" required defaultValue={term} onChange={handleChange}>
                                {renderTermOptions()}
                            </CustomInput>
                        </FormGroup>
                        */}
                        <FormGroup>
                            <Label htmlFor="faculty">
                                Faculty
                            </Label>
                            <Input id="faculty" className="input-control"  name="faculty" required value={faculty.name} disabled/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="docFile">Document File (docx, pdf)</Label>
                            <CustomInput className="input-control"  type="file" id="docFile" name="docFile" onChange={handleFileChange} label="Pick a file to replace the current one or leave it empty to keep it."/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="imageFile">Image File</Label>
                            <CustomInput className="input-control"  type="file" id="imageFile" name="imageFile" onChange={handleFileChange} label="Pick a file to replace the current one or leave it empty to keep it."/>
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

export default withRouter(EditContribution);
