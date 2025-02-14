import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, InputNumber, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setOrder } from '../../../../../redux/slides/OrderSlide';
import { formatVND } from '../../../../../ultil/index';

import * as OrderService from '../../../../../service/OrderService';
import GoodsDeliveryTable from '../GoodsDeliveryTable ';

const GoodsDeliveryTableV1 = ({ selectedProduct, onUpdateQuantity }) => {
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(0);

    const handleDelete = async (id) => {
        try {
            await OrderService.deleteOrder(id);
            message.success('Xóa sản phẩm thành công!');
        } catch (error) {
            message.error('Xóa sản phẩm thất bạii!');
        }
    };

    const order = useSelector((state) => state.order); // Lấy toàn bộ order
    const orderItems = useSelector((state) => state.order.orderItems); // Lấy danh sách sản phẩm trong order

    console.log('Order data:', order);
    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => <strong>{formatVND(price)}</strong>,
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_, record) => (
                <InputNumber
                    min={1}
                    value={record.quantity}
                    onChange={(value) => onUpdateQuantity(record._id, value)}
                    style={{ width: '80px' }}
                />
            ),
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'price',
            key: 'price',
            render: (price) => <strong>{formatVND(price)}</strong>,
        },
    ];

    // useEffect(() => {
    //     let total = selectedProduct.reduce((acc, product) => acc + product.quantity * product.price, 0);
    //     setTotalPrice(formatVND(total));
    // }, [selectedProduct]);
    return (
        <div>
            <Table columns={columns} dataSource={selectedProduct} rowKey="_id" pagination={false} />
            <div style={{ marginTop: '10px', textAlign: 'right', fontSize: '16px', fontWeight: 'bold' }}>
                Tổng tiền: {formatVND(totalPrice)}
            </div>
        </div>
    );
};

export default GoodsDeliveryTableV1;
