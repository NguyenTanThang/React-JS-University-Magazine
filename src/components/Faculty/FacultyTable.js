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
import DeleteFaculty from "./DeleteFaculty";

class FacultyTable extends Component {

    render() {
        const {faculties} = this.props;

        const currentUser = authenticationService.currentUserValue;
        const currentRole = currentUser.role.role;

        const actionCol = currentRole === Role.Admin ? {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_none, record) => {
                return (
                    <Space>
                      {populateActionButtons("faculties", record)}
                      <DeleteFaculty recordID={record._id}/>
                    </Space>
                )
            }
          } : {};

        const columns = [
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              sorter: {
                  compare: (a, b) => a.name.localeCompare(b.name),
                  multiple: 3,
              },
              filterAttribute: "name"
            },
            {
                title: 'Created At',
                dataIndex: 'created_date',
                key: 'created_date',
                sorter: {
                    compare: (a, b) => new Date(a.created_date) - new Date(b.created_date),
                    multiple: 2,
                },
                render: (created_date, record) => {
                    return (
                        parseDateMoment(created_date)
                    )
                }
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

        const filterredColumns = ["name"];

        return (
            <div>
                <TableView data={faculties} columns={columns} filterredColumns={filterredColumns}/>
            </div>
        )
    }
}

export default FacultyTable;