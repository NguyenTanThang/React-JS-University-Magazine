import React, { Component } from 'react';
import {TermTable} from "../../components/Term";
import {getAllTerms} from "../../requests";
import { message } from "antd";

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
                <TermTable terms={actualTerms}/>
            </div>
        )
    }
}

export default ViewTermPage;
