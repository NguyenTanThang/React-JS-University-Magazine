import { BehaviorSubject } from 'rxjs';

import {PROXY_URL} from '../config/config';
import { handleResponse } from '../_helpers';

const currentUserSubject = new BehaviorSubject(JSON.parse(sessionStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${PROXY_URL}/users/login`, requestOptions)
        .then(handleResponse)
        .then(userData => {
            const user = userData.data;
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return userData;
        });
}

function logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}