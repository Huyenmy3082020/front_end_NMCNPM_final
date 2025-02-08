import React, { useEffect, useState } from 'react';
import { Button, Table, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import * as OrderService from '../../../../service/OrderService.js';
import TableAdminProduct from './TableAdminProduct.jsx';
import HeaderPageAdminProduct from '../../HeaderPageAdmin/HederPageAdminProduct.jsx';

function AdminOrder() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await OrderService.getOrder();
                console.log(res);
                setOrders(res.data); // Assuming response contains `data` with order items
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    console.log('orders:', orders);

    return (
        <div>
            <HeaderPageAdminProduct></HeaderPageAdminProduct>
            <div style={{ backgroundColor: '#f4f4f4' }}>
                <h1 style={{ fontSize: '2.6rem', paddingLeft: '16px', paddingTop: '16px' }}>Order Information</h1>

                <TableAdminProduct data={orders} />
                <a href="/product/trash">Trash</a>
            </div>
        </div>
    );
}

export default AdminOrder;
