import React, { Component } from 'react';
import {parseDateMoment} from "../../utils";
import {populateActionButtons} from "../../utils";
import {
    authenticationService
} from "../../_services";
import {
    Role
} from "../../_helpers";

import TableView from "../Partial/TableView";
import { Link } from 'react-router-dom';

class UserTable extends Component {
    render() {
        const {users} = this.props;

        const currentUser = authenticationService.currentUserValue;
        const currentRole = currentUser.role.role;

        let actionCol = currentRole === Role.Admin ? {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_none, record) => {
                return (
                    <>
                      {populateActionButtons("users", record)}
                    </>
                )
            }
          } : {};
          actionCol = currentRole === Role.Coordinator ? {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_none, record) => {
                return (
                    <>
                      {populateActionButtons("users", record)}
                      <Link className="btn btn-info" to={`/chat-room/senderID/${currentUser._id}/receiverID/${record._id}`}>
                        <span className="material-icons">
                            chat
                        </span>
                      </Link>
                    </>
                )
            }
          } : {};

        const columns = [
            {
              title: 'Email',
              dataIndex: 'email',
              key: 'email',
              sorter: {
                  compare: (a, b) => a.email.localeCompare(b.email),
                  multiple: 3,
              },
              filterAttribute: "email"
            },
            {
              title: 'Username',
              dataIndex: 'username',
              key: 'username',
              sorter: {
                  compare: (a, b) => a.username.localeCompare(b.username),
                  multiple: 2,
              },
              filterAttribute: "username"
            },
            {
                title: 'Role',
                dataIndex: 'role',
                key: 'role',
                sorter: {
                    compare: (a, b) => a.role.role.localeCompare(b.role.role),
                    multiple: 2,
                },
                render: (role, record) => {
                    return (
                       role.role
                    )
                },
                filterAttribute: "role.role"
              },
            {
              title: 'Last Modified',
              dataIndex: 'last_modified_date',
              key: 'last_modified_date',
              sorter: {
                  compare: (a, b) => new Date(a.last_modified_date) - new Date(b.last_modified_date),
                  multiple: 1,
              },
              render: (last_modified_date, record) => {
                  return (
                      parseDateMoment(last_modified_date)
                  )
              }
            },
            actionCol
        ];

        const filterredColumns = ["email", "username", "role.role"];

        return (
            <div>
                <TableView data={users} columns={columns} filterredColumns={filterredColumns}/>
            </div>
        )
    }
}

export default UserTable;