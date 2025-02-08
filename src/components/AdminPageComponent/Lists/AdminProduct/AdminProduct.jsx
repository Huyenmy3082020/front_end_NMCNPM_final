import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import * as Productservice from '../../../../service/Productservice.js';
import * as CategoriService from '../../../../service/CategoriService';
import ModalComponent from '../../../ModalComponent/ModalComponent.jsx';
import TableComponent from '../../../TableComponent/TableComponent.jsx';
import { useNavigate } from 'react-router-dom';
import HeaderPageAdminProduct from '../../HeaderPageAdmin/HederPageAdminProduct.jsx';
function AdminProduct() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [avatar, setAvatar] = useState('');
    const [productType, setProductType] = useState('');
    // State để lưu type
    const [isAddProductVisible, setAddProductVisible] = useState(false);

    const limit = 12;
    useEffect(() => {
        const fetchProductAll = async () => {
            try {
                const res = await Productservice.getAllProduct(limit);
                setProducts(res.data || []);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
            }
        };

        fetchProductAll();
    }, []);
    const [category, setCategory] = useState('');

    useEffect(() => {
        const fetchCategoryByName = async () => {
            try {
                const res = await CategoriService.getOrderByName(productType);
                setCategory(res);
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };

        if (productType) {
            fetchCategoryByName();
        }
    }, [productType]);

    const navigate = useNavigate();
    return (
        <div>
            <HeaderPageAdminProduct></HeaderPageAdminProduct>
            <div style={{ backgroundColor: '#f4f4f4' }}>
                <h1 style={{ fontSize: '2.6rem', marginLeft: '16px', paddingTop: '16px' }}>Thông tin sản phẩm</h1>
                <Button
                    style={{
                        height: '150px',
                        width: '150px',
                        borderRadius: '6px',
                        borderStyle: 'dashed',
                        marginLeft: '32px',
                    }}
                    onClick={() => navigate('/add_product')} // Sử dụng navigate để chuyển hướng
                >
                    <PlusOutlined style={{ fontSize: '5rem' }} />
                </Button>
                <TableComponent data={products} />
                <a href="/product/trash">Thung rac</a>
            </div>
        </div>
    );
}

export default AdminProduct;
