import React, { Component } from 'react';
import {populateActionButtons, calculateDaysDiff, parseDateMoment} from "../../utils";
import {Space} from "antd";
import {
    authenticationService
} from "../../_services";
import {
    Role
} from "../../_helpers";
import {
    Link
} from "react-router-dom";

import TableView from "../Partial/TableView";
import DeleteTerm from "./DeleteTerm";

class TermTable extends Component {
    render() {
        const {terms, deleteTerm} = this.props;
        const currentUser = authenticationService.currentUserValue;
        const currentRole = currentUser.role.role;
        let actionCol = {};

        switch (currentRole) {
            case Role.Admin:
                actionCol = {
                    title: 'Actions',
                    dataIndex: 'actions',
                    key: 'actions',
                    render: (_none, record) => {
                        return (
                            <Space>
                            {populateActionButtons("terms", record)}
                              <DeleteTerm deleteTerm={deleteTerm} recordID={record._id}/>
                            </Space>
                        )
                    }
                };
                break;
                case Role.Student:
                    actionCol = {
                        title: 'Actions',
                        dataIndex: 'actions',
                        key: 'actions',
                        render: (_none, record) => {
                            if (!calculateDaysDiff(record, 0)) {
                                return (
                                    <Space>
                                      <Link className="btn btn-info" to={`/contributions?termID=${record._id}`}>
                                        <span className="material-icons">
                                            visibility
                                        </span>
                                      </Link>
                                      <Link className="btn btn-primary" to={`/contributions/add?termID=${record._id}`}>
                                        <span className="material-icons">
                                            upload
                                        </span>
                                      </Link>
                                    </Space>
                                )
                            } else {
                                return (
                                    <Space>
                                      <Link className="btn btn-info" to={`/contributions?termID=${record._id}`}>
                                        <span className="material-icons">
                                            visibility
                                        </span>
                                      </Link>
                                      <Link className="btn btn-primary disabled" to={`/contributions/add?termID=${record._id}`}>
                                        <span className="material-icons">
                                            upload
                                        </span>
                                      </Link>
                                    </Space>
                                )
                            }
                        }
                      };
                    break;
            default:
                actionCol = {
                    title: 'Actions',
                    dataIndex: 'actions',
                    key: 'actions',
                    render: (_none, record) => {
                        return (
                            <Space>
                                <Link className="btn btn-info" to={`/contributions?termID=${record._id}`}>
                                <span className="material-icons">
                                    visibility
                                </span>
                                </Link>
                            </Space>
                        )
                    }
                  }
                break;
        }

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
              title: 'Closure Date',
              dataIndex: 'closureDate',
              key: 'closureDate',
              sorter: {
                  compare: (a, b) => new Date(a.closureDate) - new Date(b.closureDate),
                  multiple: 2,
              },
              render: (closureDate, record) => {
                  return (
                      parseDateMoment(closureDate)
                  )
              }
            },
            {
              title: 'Final Closure Date',
              dataIndex: 'finalClosureDate',
              key: 'finalClosureDate',
              sorter: {
                  compare: (a, b) => new Date(a.finalClosureDate) - new Date(b.finalClosureDate),
                  multiple: 2,
              },
              render: (finalClosureDate, record) => {
                  return (
                      parseDateMoment(finalClosureDate)
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
                <TableView data={terms} columns={columns} filterredColumns={filterredColumns}/>
            </div>
        )
    }
}

export default TermTable;