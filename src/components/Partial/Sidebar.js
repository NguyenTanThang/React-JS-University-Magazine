import React, { Component } from 'react';
import {Link} from "react-router-dom";
import shortid from "shortid";
import {returnLinksList} from "../../utils"
import {authenticationService} from "../../_services"

export default class Sidebar extends Component {

    state = {
        listOfLinks: [
            {
                link: "/",
                icon: "person",
                text: "Users"
            },
            {
                link: "/terms",
                icon: "calendar_today",
                text: "Term"
            },
            {
                link: "/faculties",
                icon: "account_balance",
                text: "Faculties"
            },
            {
                link: "/faculty-assignments",
                icon: "person_add_alt_1",
                text: "Assignments"
            },
            {
                link: "/contributions/add",
                icon: "upload",
                text: "Upload"
            },
            {
                link: "/contributions",
                icon: "folder_open",
                text: "Contributions"
            },
        ]
    }

    componentDidMount() {
        const currentRole = authenticationService.currentUserValue.role.role;
        this.setState({
            listOfLinks: returnLinksList(currentRole)
        })
    }

    renderSidebarItems = () => {
        const {listOfLinks} = this.state;
        const {toggleSidebarActive} = this.props;
        return listOfLinks.map(linkItem => {
            const {link, icon, text} = linkItem;
            return (
                <div key={shortid()} className="side-bar__item" onClick={toggleSidebarActive}>
                        <Link to={link}>
                            <div className="side-bar-item__icon">
                                <span className="material-icons">
                                    {icon}
                                </span>
                            </div>
                            <div className="side-bar-item__text">
                                {text}
                            </div>
                        </Link>
                    </div>
            )
        })
    }

    render() {
        const {renderSidebarItems} = this;
        const {active} = this.props;

        const activeClass = active ? "active" : "";

        return (
            <div className={`side-bar ${activeClass}`}>
                <div className="side-bar__list">
                    {renderSidebarItems()}
                </div>
            </div>
        )
    }
}
