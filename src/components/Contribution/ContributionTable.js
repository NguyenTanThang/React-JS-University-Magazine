import React, { Component } from 'react';
import {parseDateMoment} from "../../utils";
import {populateActionButtons} from "../../utils";

import TableView from "../Partial/TableView";

class ContributionTable extends Component {

    render() {
        const {contributions} = this.props;

        const columns = [
            {
              title: 'Title',
              dataIndex: 'title',
              key: 'title',
              sorter: {
                  compare: (a, b) => a.title.localeCompare(b.title),
                  multiple: 3,
              },
              filterAttribute: "title"
            },
            {
              title: 'Contributor',
              dataIndex: 'contributor',
              key: 'contributor',
              sorter: {
                  compare: (a, b) => a.contributor.username.localeCompare(b.contributor.username),
                  multiple: 2,
              },
              render: (contributor, record) => {
                  return (
                      contributor.username
                  )
              },
              filterAttribute: "contributor.username"
            },
            {
                title: 'Term',
                dataIndex: 'term',
                key: 'term',
                sorter: {
                    compare: (a, b) => a.term.name.localeCompare(b.term.name),
                    multiple: 2,
                },
                render: (term, record) => {
                    return (
                        term.name
                    )
                },
                filterAttribute: "term.name"
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
            {
                title: 'Actions',
                dataIndex: 'actions',
                key: 'actions',
                render: (_none, record) => {
                    return (
                        <>
                          {populateActionButtons("contributions", record)}
                        </>
                    )
                }
              },
        ];

        const filterredColumns = ["title", "contributor.username", "term.name", "faculty.name"];

        return (
            <div>
                <TableView data={contributions} columns={columns} filterredColumns={filterredColumns}/>
            </div>
        )
    }
}

export default ContributionTable;