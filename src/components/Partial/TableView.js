import React, { Component } from 'react'
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import shortid from "shortid";

class TableView extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
    selectedRowKeys: [],
    data: [],
    loading: true
  };

  async componentDidMount() {
    const {data} = this.props;
    this.setState({
        data,
        loading: false
    })
  }

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  getColumnSearchPropsAdvanced = (dataObjectStructure, dataIndex) => {
    dataObjectStructure = dataObjectStructure.split(".")

    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                this.setState({
                  searchText: selectedKeys[0],
                  searchedColumn: dataIndex,
                });
              }}
            >
              Filter
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) => {
        let selectedObject = record;

        for (let i = 0; i < dataObjectStructure.length; i++) {
          const dataObjectStructureItem = dataObjectStructure[i];
          selectedObject = selectedObject[dataObjectStructureItem]
        }

        return selectedObject
        ? selectedObject.toString().toLowerCase().includes(value.toLowerCase())
        : ''
      }
        ,
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => this.searchInput.select(), 100);
        }
      },
      render: (text, record) => {
        let selectedObject = record;

        for (let i = 0; i < dataObjectStructure.length; i++) {
          const dataObjectStructureItem = dataObjectStructure[i];
          selectedObject = selectedObject[dataObjectStructureItem]
        }

        return (
          this.state.searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[this.state.searchText]}
              autoEscape
              textToHighlight={selectedObject ? selectedObject : ''}
            />
          ) : (
            selectedObject
          )
        )
      }
        
    }
  };

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const {selectedRowKeys, loading} = this.state;
    const {columns, filterredColumns, data} = this.props;
    let masterColumns = [];

    masterColumns = columns.map(column => {
      const indexOfKey = filterredColumns.indexOf(column.filterAttribute);
      if (indexOfKey > -1 && !filterredColumns[indexOfKey].includes(".")) {
        return {
          ...this.getColumnSearchProps(filterredColumns[indexOfKey]),
          ...column,
        }
      } else if (indexOfKey > -1 && filterredColumns[indexOfKey].includes(".")) {
        console.log(filterredColumns[indexOfKey].split(".")[0]);
        return {
          ...column,
          ...this.getColumnSearchPropsAdvanced(filterredColumns[indexOfKey], filterredColumns[indexOfKey].split(".")[0]),
        }
      }
      return {
        ...column
      }
    })

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
 
    return <Table 
    //rowSelection={rowSelection} 
    columns={masterColumns} dataSource={data} loading={loading}/>;
  }
}

export default TableView;

