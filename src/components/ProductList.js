import React from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Button, Icon, Divider } from 'antd';

const ProductList = ({ onDelete, products }) => {
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows)=>{
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckedboxProps: record => ({
          disabled: record.name === 'Disabled User', //Column configuration not to be checked
          name: record.name,
        }),
    }
    const columns = [{
        title: 'Name',
        dataIndex: 'name',
    }, {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Actions',
        render: (text, record) => {
            return (
                <span>
                <a href="javascript:;">{record.name}</a>
                <Divider type="vertical" />
                <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
                  <Button>Delete</Button>
                </Popconfirm>
                <Divider type="vertical" />
                <a href="javascript:;" className="ant-dropdown-link">More Actions<Icon type="down" /></a>
                </span>
            );
        },
    }];
    return(
        <Table 
          rowSelection={rowSelection}
          dataSource={products}
          columns={columns}
        />
    );
};



ProductList.PropTypes = {
    onDelete: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired
};

export default ProductList;