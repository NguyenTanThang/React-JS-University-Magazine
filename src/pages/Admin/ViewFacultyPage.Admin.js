import React, { Component } from 'react';
import {FacultyTable} from "../../components/Faculty";
import {getAllFaculties} from "../../requests";
import { message } from "antd";

class ViewFacultyPage extends Component {

    state = {
        faculties: []
    }
    
    async componentDidMount() {
        try {
            const data = await getAllFaculties();
            this.setState({
                faculties: data.data
            })
        } catch (error) {
            console.log(error);
            message.error(error.message);
        }
    }

    render() {
        let {faculties} = this.state;

        let actualFaculties = faculties.map(fac => {
            return {
                ...fac,
                key: fac._id
            }
        })

        return (
            <div>
                <FacultyTable faculties={actualFaculties}/>
            </div>
        )
    }
}

export default ViewFacultyPage;
