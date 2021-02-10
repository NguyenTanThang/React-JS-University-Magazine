import React, { Component } from 'react';
import {parseDateMoment} from "../../utils";
import {populateActionButtons} from "../../utils";
import {Space} from "antd";
import {
    authenticationService
} from "../../_services";
import {
    Role
} from "../../_helpers";

import TableView from "../Partial/TableView";
import DeleteFacultyAssignment from "./DeleteFacultyAssignment";

class FacultyAssignmentTable extends Component {
    render() {
        const {facultyAssignments} = this.props;

        const currentUser = authenticationService.currentUserValue;
        const currentRole = currentUser.role.role;

        const actionCol = currentRole === Role.Admin ? {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_none, record) => {
                return (
                    <Space>
                        {populateActionButtons("faculty-assignemnts", record)}
                      <DeleteFacultyAssignment recordID={record._id}/>
                    </Space>
                )
            }
          } : {};

        const columns = [
            {
              title: 'Email',
              dataIndex: 'email',
              key: 'email',
              sorter: {
                  compare: (a, b) => a.user.email.localeCompare(b.user.email),
                  multiple: 4,
              },
              render: (user, record) => {
                  return (
                    record.user.email
                  )
              },
              filterAttribute: "user.email"
            },
            {
                title: 'Username',
                dataIndex: 'username',
                key: 'username',
                sorter: {
                    compare: (a, b) => a.user.username.localeCompare(b.user.username),
                    multiple: 3,
                },
                render: (user, record) => {
                    return (
                      record.user.username
                    )
                },
                filterAttribute: "user.username"
              },
              {
                title: 'Faculty',
                dataIndex: 'faculty',
                key: 'faculty',
                sorter: {
                    compare: (a, b) => a.faculty.name.localeCompare(b.faculty.name),
                    multiple: 2,
                },
                render: (faculty, record) => {
                    return (
                        faculty.name
                    )
                },
                filterAttribute: "faculty.name"
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

        const filterredColumns = ["user.email", "user.username", "faculty.name"];

        return (
            <div>
                <TableView data={facultyAssignments} columns={columns} filterredColumns={filterredColumns}/>
            </div>
        )
    }
}

export default FacultyAssignmentTable;