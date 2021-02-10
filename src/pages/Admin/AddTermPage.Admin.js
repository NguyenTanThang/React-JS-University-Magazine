import React, { Component } from 'react';
import {AddTerm} from "../../components/Term";
import {Navbar} from "../../components/Partial";
import {PageHeader} from "antd";

class AddTermPage extends Component {

    render() {
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
                                title={"Add Term"}
                                subTitle={``}
                            />
                        </div>
                        <AddTerm/>
                    </div>
                </main>
            </div>
        )
    }
}

export default AddTermPage;
