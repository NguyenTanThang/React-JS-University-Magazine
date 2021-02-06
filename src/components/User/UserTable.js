import React, { Component } from 'react';
import {parseDateMoment} from "../../utils";

import TableView from "../Partial/TableView";

class UserTable extends Component {
    render() {
        const {users} = this.props;

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