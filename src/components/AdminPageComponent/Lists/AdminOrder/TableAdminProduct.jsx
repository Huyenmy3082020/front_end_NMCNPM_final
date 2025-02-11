import React, { useEffect, useState } from 'react';
import { Divider, Radio, Table, Button, Popconfirm, Modal, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import * as Productservice from '../../../../service/Productservice';

const TableAdminProduct = ({ data }) => {
    const [selectionType, setSelectionType] = useState('checkbox');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const columns = () => [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'description',
            dataIndex: 'description',
            key: 'description',
            sorter: (a, b) => a.description.length - b.description.length,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'So luong',
            dataIndex: 'customInput',
            key: 'customInput',
            render: (_, record) => (
                <Input placeholder="Nhập dữ liệu" defaultValue={record.name} style={{ width: '40px' }} />
            ),
        },

        {
            title: 'categoryId',
            dataIndex: 'categoryId',
            key: 'categoryId',
            render: (categoryId) => categoryId?.name,
        },

        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <div>
                    <Popconfirm
                        title="Are you sure you want to delete this item?"
                        onConfirm={() => handleDelete(record._id)}
                    >
                        <Button icon={<DeleteOutlined />} type="danger">
                            Delete
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const handleOk = () => {
        setIsModalOpen(false);
        setCurrentProduct(null);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setCurrentProduct(null);
    };

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        Productservice.deleteProduct(id);
    };

    const onFinish = (values) => {};

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleSelectChange = (selectedKeys) => {
        console.log('Selected Row Keys:', selectedKeys);
        setSelectedRowKeys(selectedKeys);
    };

    return (
        <div>
            <Radio.Group
                onChange={({ target: { value } }) => {
                    setSelectionType(value);
                    setSelectedRowKeys([]);
                }}
                value={selectionType}
            ></Radio.Group>

            <Divider />

            <Table
                rowSelection={{
                    type: selectionType,
                    selectedRowKeys,
                    onChange: handleSelectChange,
                }}
                columns={columns()}
                dataSource={data}
                rowKey="_id"
            />
        </div>
    );
};

export default TableAdminProduct;
