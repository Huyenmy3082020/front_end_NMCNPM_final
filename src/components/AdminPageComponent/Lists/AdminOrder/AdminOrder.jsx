import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import * as OrderService from '../../../../service/OrderService.js';
import TableAdminProduct from './TableAdminProduct.jsx';
import HeaderPageAdminProduct from '../../HeaderPageAdmin/HederPageAdminProduct.jsx';
import * as Productservice from '../../../../service/Productservice.js';
import TableComponent from '../../../TableComponent/TableComponent.jsx';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Import CSS mặc định của Tippy
import { Select } from 'antd';
import styles from './AdminOrder.module.scss';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css'; // Đảm bảo có file này
import Dropdown from '../../Dropdown/Dropdown.jsx';
import FooterAdmin from '../../FooterAdmin/FooterAdmin.jsx';
import AutoCompleteAdmin from '../../HeaderPageAdmin/AutoCompleteAdmin.jsx';

function AdminOrder() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState([]);
    const { Option } = Select;

    const handleSelectChange = (value) => {
        console.log('Sản phẩm đã chọn:', value);
    };
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await OrderService.getOrder();
                console.log(res);
                setOrders(res.data); // Lưu danh sách orders
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleSelectProduct = (product) => {
        setSelectedProduct((prev) => [...prev, product]);
    };
    const menuItemStyle = {
        display: 'block',
        width: '100%',
        padding: '8px 12px',
        textAlign: 'left',
        background: 'none',
        border: 'none',
        color: '#333',
        cursor: 'pointer',
        fontSize: '14px',
    };
    console.log('selectedProduct:', selectedProduct);
    return (
        <div>
            <HeaderPageAdminProduct />
            <div style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
                <div style={{ backgroundColor: '#fff', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
                        <AutoCompleteAdmin onSelectProduct={handleSelectProduct} />
                    </div>
                    <TableAdminProduct data={selectedProduct} />
                </div>
            </div>
            <div>
                <FooterAdmin></FooterAdmin>
            </div>
        </div>
    );
}

export default AdminOrder;
