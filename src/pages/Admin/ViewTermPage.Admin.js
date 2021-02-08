import React, { Component } from 'react';
import {TermTable} from "../../components/Term";
import {getAllTerms} from "../../requests";
import { message, Space } from "antd";
import {Link} from "react-router-dom";
import {Navbar} from "../../components/Partial";

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

    render() {
        let {terms} = this.state;

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
                        <Space>
                            <Link to="/terms/add" className="btn btn-primary">Add Term</Link>
                        </Space>
                        <TermTable terms={actualTerms}/>
                    </div>
                </main>
            </div>
        )
    }
}

export default ViewTermPage;
