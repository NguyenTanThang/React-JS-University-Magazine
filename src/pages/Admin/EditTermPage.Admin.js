import React, { Component } from 'react';
import {EditTerm} from "../../components/Term";
import {
    getTermByID
} from "../../requests";
import {Navbar} from "../../components/Partial";
import {PageHeader} from "antd";

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
                <Navbar/>
                <main>
                    <div className="container">
                        <div className="page-header">
                            <PageHeader
                                className="site-page-header"
                                onBack={() => {
                                    this.props.history.push("/terms")
                                }}
                                title={"Edit Term"}
                                subTitle={``}
                            />
                        </div>
                        <EditTerm termItem={termItem}/>
                    </div>
                </main>
            </div>
        )
    }
}

export default EditTermPage;
