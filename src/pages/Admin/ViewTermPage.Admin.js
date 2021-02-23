import React, { Component } from 'react';
import {TermTable} from "../../components/Term";
import {getAllTerms} from "../../requests";
import { message, Space } from "antd";
import {Link} from "react-router-dom";
import {Navbar} from "../../components/Partial";
import {authenticationService} from "../../_services";
import {Role} from "../../_helpers";

class ViewTermPage extends Component {

    state = {
        terms: []
    }
    
    async componentDidMount() {
        try {
            const data = await getAllTerms();
            this.setState({
                terms: data.data
            })
        } catch (error) {
            console.log(error);
            message.error(error.message);
        }
    }

    deleteTerm = (termID) => {
        this.setState({
            terms: this.state.terms.filter(term => {
                return term._id !== termID;
            })
        })
    }

    render() {
        const {deleteTerm} = this;
        let {terms} = this.state;
        const currentUser = authenticationService.currentUserValue;
        const currentRole = currentUser.role.role;

        let actualTerms = terms.map(term => {
            return {
                ...term,
                key: term._id
            }
        })

        return (
            <div>
                <Navbar/>
                <main>
                    <div className="container">
                        <h2>View Terms</h2>
                        {
                            currentRole === Role.Admin ? (
                                <Space>
                                    <Link to="/terms/add" className="btn btn-primary">Add Term</Link>
                                </Space>
                            ) : (<></>)
                        }
                        <TermTable terms={actualTerms} deleteTerm={deleteTerm}/>
                    </div>
                </main>
            </div>
        )
    }
}

export default ViewTermPage;
