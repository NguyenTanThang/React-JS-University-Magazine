import React, { Component } from 'react';
import {Link} from "react-router-dom"

export default class Sidebar extends Component {
    render() {
        const {active} = this.props;

        const activeClass = active ? "active" : "";

        return (
            <div className={`side-bar ${activeClass}`}>
                <div className="side-bar__list">
                    <div className="side-bar__item">
                        <Link to="/terms">
                            <div className="side-bar-item__icon">
                                <span className="material-icons">
                                    calendar_today
                                </span>
                            </div>
                            <div className="side-bar-item__text">
                                Term
                            </div>
                        </Link>
                    </div>
                    <div className="side-bar__item">
                        <Link to="/contributions/add">
                            <div className="side-bar-item__icon">
                                <span className="material-icons">
                                    upload
                                </span>
                            </div>
                            <div className="side-bar-item__text">
                                Upload
                            </div>
                        </Link>
                    </div>
                    <div className="side-bar__item">
                        <Link to="/contributions">
                            <div className="side-bar-item__icon">
                                <span className="material-icons">
                                    folder_open
                                </span>
                            </div>
                            <div className="side-bar-item__text">
                                View
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
