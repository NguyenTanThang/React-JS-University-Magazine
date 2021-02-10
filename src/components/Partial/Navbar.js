import React, { Component } from 'react';
import {uniLogo} from "../../img";
import {Sidebar} from "./";
import {Link} from "react-router-dom";
import {authenticationService} from "../../_services";

export default class Navbar extends Component {

    state = {
        activeSidebar: false,
        activeUserActionDropdown: false,
        loggedIn: authenticationService.currentUserValue
    }

    toggleSidebarActive = () => {
        this.setState({
            activeSidebar: !this.state.activeSidebar
        })
    }

    toggleUserActionDropdownActive = () => {
        this.setState({
            activeUserActionDropdown: !this.state.activeUserActionDropdown
        })
    }

    render() {
        const {activeSidebar, activeUserActionDropdown, loggedIn} = this.state;
        const {toggleSidebarActive, toggleUserActionDropdownActive} = this;

        const toggleUserActionDropdownActiveClass = activeUserActionDropdown ? "active" : "";

        if (loggedIn) {
            return (
                <>
                    <div className="navbar">
                        <div className="container-fluid">
                            <div className="navbar__main-nav">
                                <div className="navbar__main-nav__left">
                                    <div className="sidebar-toggle" onClick={toggleSidebarActive}>
                                        {
                                            activeSidebar ? <span className="material-icons">
                                            menu_open
                                        </span> : 
                                            <span className="material-icons">
                                                menu
                                            </span>
                                        }
                                    </div>
                                    <div className="navbar-brand">
                                        <Link to="/">
                                            <img src={uniLogo} alt="Logo" className="img-fluid"/>
                                        </Link>
                                    </div>
                                </div>
                                <div className="navbar__main-nav__right">
                                    <ul className="main-nav-right__list">
                                        <li>
                                            <Link to="/chat">
                                                <span className="material-icons">
                                                chat_bubble_outline
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>
    
                                    <div className="main-nav-left__user-actions">
                                        <div className=" user-actions-container" onClick={toggleUserActionDropdownActive}>
                                            <div className="user-action__avatar">
                                            <span className="material-icons">
                                                person
                                            </span>
                                        </div>
                                        <p>{loggedIn.username}</p>
                                        <div className="user-action__expand-icon">
                                            <span className="material-icons">
                                                keyboard_arrow_down
                                            </span>
                                        </div>
                                        </div>
                                        <div className={`user-actions-dropdown ${toggleUserActionDropdownActiveClass}`}>
                                            <ul>
                                                <li>
                                                    <Link to="/change-password">
                                                        Change Password
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/logout">
                                                        Logout
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Sidebar active={activeSidebar} toggleSidebarActive={toggleSidebarActive}/>
                </>
            )
        }

        return (
            <>
            </>
        )
    }
}
