import React, { Component } from 'react';
import {EditTerm} from "../../components/Term";
import {
    getTermByID
} from "../../requests";

class EditTermPage extends Component {

    state = {
        termItem: ""
    }

    async componentDidMount() {
        const {termID} = this.props.match.params;
        const data = await getTermByID(termID);

        this.setState({
            termItem: data.data
        })
    }

    render() {
        const {termItem} = this.state;

        if (!termItem) {
            return (<></>)
        }

        return (
            <div>
                <h2>Edit Term</h2>
                <EditTerm termItem={termItem}/>
            </div>
        )
    }
}

export default EditTermPage;
