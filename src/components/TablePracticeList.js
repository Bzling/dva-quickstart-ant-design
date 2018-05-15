import React from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Button, Icon, Divider, Input } from 'antd';

const data = [{
  key: '1',
  name: 'AAA Red',
  username: 'sunnyday',
  age: 32,
  address: 'London',
}, {
  key: '2',
  name: 'BBB Black',
  username: 'windynight',
  age: 23,
  address: 'New York',
}, {
  key: '3', 
  name: 'CC Red',
  username: 'cloudy',
  age: 35,
  address: 'London',
}, {
  key: 4,
  name: 'DD Black',
  username: 'snowy',
  age: 24,
  address: 'New York',
}]

class TablePracticeList extends React.Component{
    state = {
        filterInfo: null,
        sortedInfo: null,
        filterDropdownVisible: false,
        data,
        searchText: '',
        filtered: false,
    };
    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
    }
    onSearch = () => {
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            filterDropdownVisible: true,
            filtered: !!searchText,
            data: data.map((record) => {
                const match = record.username.match(reg);
                if(!match){
                    return null;
                }
                return{
                    ...record,
                    username:(
                        <span>
                        {record.username.split(new RegExp(`(?<=${searchText}|(?=${searchText}`, 'i')).map((text, i)=>(
                            text.toLowerCase()===searchText.toLowerCase() ? 
                            <span key={i} className="highlight">{text}</span> : text //eslint-disable-line
                        ))}
                        </span>
                    ),
                };
            }).filter(record => !!record),
        })
    }
    handleChange = (pagination, filters, sorter) => {
        this.setState({
            filterInfo: filters,
            sortedInfo: sorter,
            filterDropdownVisible: true,
        });
    }
    clearFilters = () => {
        this.setState({ filterInfo: null });
    }
    clearAll = () => {
        this.setState({
            filterInfo: null,
            sortedInfo: null
        });
    }
    setAgeSort = () => {
        this.setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'age',
            },
        });
    }

    render(){
        let { sortedInfo, filterInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filterInfo = filterInfo || {};
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key:'name',
            filters: [
                { text: 'AAA', value: 'AAA'},
                { text:'BBB', value: 'BBB'},
                { text: 'Submenu', value: 'Submenu', children: [{
                    text: 'Black', value: 'Black',
                }, {
                    text: 'Red', value: 'Red',
                }]}
            ],
            filteredValue: filterInfo.name || null,
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            //onFilter: (value, record) => record.name.includes(value),
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        }, {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            sorter: (a, b) => a.age - b.age,
            sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
        }, {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            filters: [
                { text: 'London', value: 'London'},
                { text: 'New York', value: 'New York'}
            ],
            filteredValue: filterInfo.address || null,
            onFilter: (value, record) => record.address.indexOf(value) === 0,
            sortedOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
        }, {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                  <Input ref={ele => this.searchInput = ele}
                  placeholder="Search Username"
                  value = {this.state.searchText}
                  onChange={this.onInputChange}
                  onPressEnter={this.onSearch}
                  />
                  <Button type="primary" onClick={this.onSearch}>Search</Button>
                </div>
            ),
            filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa'}} />,
            filterDropdownVisible: this.state.filterDropdownVisible,
            onFilterDropDownVisibleChange: (visible) => {
                this.setState({
                    filterDropdownVisible: visible,
                }, ()=>this.searchInput && this.searchInput.focus());
            }
        }];
        return (
            <div>
              <div className="table-operations">
                <Button onClick={this.setAgeSort}>Sort Age</Button>
                <Button onClick={this.clearFilters}>Clear Filters</Button>
                <Button onClick={this.clearAll}>Clear All</Button>
              </div>
              <Table columns={columns} dataSource={data} onChange={this.handleChange} />
            </div>
        )
    }
}


export default TablePracticeList;