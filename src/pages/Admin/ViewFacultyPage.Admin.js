import React, { Component } from 'react';
import {FacultyTable} from "../../components/Faculty";
import {getAllFaculties} from "../../requests";
import { message, Space } from "antd";
import {Link} from "react-router-dom";
import {Navbar} from "../../components/Partial";
import {authenticationService} from "../../_services";
import {Role} from "../../_helpers";

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

    deleteFaculty = (facID) => {
        this.setState({
            faculties: this.state.faculties.filter(faculty => {
                return faculty._id !== facID;
            })
        })
    }

    render() {
        const {deleteFaculty} = this;
        let {faculties} = this.state;
        const currentUser = authenticationService.currentUserValue;
        const currentRole = currentUser.role.role;

        let actualFaculties = faculties.map(fac => {
            return {
                ...fac,
                key: fac._id
            }
        })

        return (
            <div>
                <Navbar/>
                <main>
                    <div className="container">
                        <h2>View Faculty</h2>
                        {
                            currentRole === Role.Admin ? (
                                <Space>
                                    <Link to="/faculties/add" className="btn btn-primary">Add Faculty</Link>
                                </Space>
                            ) : (<></>)
                        }
                        
                        <FacultyTable deleteFaculty={deleteFaculty} faculties={actualFaculties}/>
                    </div>
                </main>
            </div>
        )
    }
}

export default ViewFacultyPage;
