import React, { Component } from 'react';
import {parseDateMoment} from "../../utils";

import TableView from "../Partial/TableView";

class TermTable extends Component {
    render() {
        const {terms} = this.props;

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
        ];

        const filterredColumns = ["email", "username", "role.role"];

        return (
            <div>
                <TableView data={terms} columns={columns} filterredColumns={filterredColumns}/>
            </div>
        )
    }
}

export default TermTable;