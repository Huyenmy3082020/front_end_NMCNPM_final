import React from 'react';
import { Table, Button, Popconfirm } from 'antd';

const columns = [
    {
        title: 'Order ID',
        dataIndex: '_id',
        key: '_id',
    },
    {
        title: 'Quantity',
        dataIndex: 'orderItems',
        key: 'quantity',
        render: (orderItems) => {
            return (
                orderItems?.map((item, index) => {
                    return (
                        <div key={index}>
                            Số lượng sản phẩm {index + 1}: {item.quantity}
                        </div>
                    );
                }) || 'No name'
            );
        },
    },
    {
        title: 'Payment Method',
        dataIndex: 'paymentMethos',
        key: 'paymentMethos',
    },

    {
        title: 'Name',
        dataIndex: 'orderItems',
        key: 'name',
        render: (orderItems) => {
            return (
                orderItems?.map((item, index) => {
                    return (
                        <div key={index}>
                            Sản phẩm {index + 1}: {item.name}
                        </div>
                    );
                }) || 'No name'
            );
        },
    },

    {
        title: 'Total Price',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        render: (price) => `${price} VND`, // Assuming price is in VND
    },
];

const TableAdminProduct = ({ data }) => {
    console.log(data);

    return <Table columns={columns} dataSource={data} rowKey="_id" />;
};

export default TableAdminProduct;
