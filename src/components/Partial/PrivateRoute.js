import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {message} from "antd";

import { authenticationService } from '../../_services';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            message.error("Unauthenticated user");
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(currentUser.role.role) === -1) {
            message.error(`Unauthorized user. Accepted roles: ${roles}`);
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: '/'}} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)