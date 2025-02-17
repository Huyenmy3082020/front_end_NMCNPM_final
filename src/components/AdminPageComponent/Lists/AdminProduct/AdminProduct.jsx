import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import * as Productservice from '../../../../service/Productservice.js';
import * as CategoryService from '../../../../service/CategoriService.js';
import * as InventoryService from '../../../../service/InventoryService.js';
import TableComponent from '../../../TableComponent/TableComponent.jsx';
import { useNavigate } from 'react-router-dom';
import HeaderPageAdminProduct from '../../HeaderPageAdmin/HederPageAdminProduct.jsx';
import ModalComponent from '../../../ModalComponent/ModalComponent.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteAllProducts } from '../../../../redux/slides/ProductSlide.js';

function AdminProduct() {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    console.log(products);
    useEffect(() => {
        const fetchProductAll = async () => {
            try {
                const productResponse = await Productservice.getAllIngredient();
                const products = productResponse.data.ingredients;

                console.log(products);
                const inventoryData = await Promise.all(
                    products.map(async (product) => {
                        try {
                            const inventoryResponse = await InventoryService.getIngredientId(product._id);
                            console.log(inventoryResponse);
                            const inventory = inventoryResponse.data || { stock: 0, status: 'Chưa có hàng' }; // Mặc định nếu chưa có
                            return { ...product, inventory };
                        } catch (error) {
                            console.error(`Lỗi lấy inventory cho ${product._id}:`, error);
                            return { ...product, inventory: { stock: 0, status: 'Chưa có hàng' } }; // Xử lý lỗi và gán mặc định
                        }
                    }),
                );

                console.log(inventoryData);
                setProducts(inventoryData);
                // Dispatch action để cập nhật sản phẩm vào Redux store
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProductAll();
    }, [dispatch]);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        setIsModalOpen(false);
    };

    const onFinishFailed = (errorInfo) => {};

    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await CategoryService.getAll();
                setCategories(res.categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);
    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const res = await CategoryService.getAllSupplies();
                setSuppliers(res.suppliers);
            } catch (error) {
                console.error('Error fetching suppliers:', error);
            }
        };
        fetchSuppliers();
    }, []);
    const handleSuccess = (res) => {
        setProducts((prevProducts) => [...prevProducts, res]);
    };

    const XoaTat = () => {
        dispatch(deleteAllProducts());
    };
    const product = useSelector((state) => state.product.products);
    console.log(product);
    console.log(products);
    return (
        <div>
            <HeaderPageAdminProduct />
            <div style={{ backgroundColor: '#f4f4f4' }}>
                <h1 onClick={XoaTat}> xoa</h1>
                <h1 style={{ fontSize: '2.6rem', marginLeft: '16px', paddingTop: '16px' }}>Thông tin sản phẩm</h1>
                <Button
                    style={{
                        height: '150px',
                        width: '150px',
                        borderRadius: '6px',
                        borderStyle: 'dashed',
                        marginLeft: '32px',
                    }}
                    onClick={showModal}
                >
                    <PlusOutlined style={{ fontSize: '5rem' }} />
                </Button>
                <TableComponent data={products} />

                {/* ModalComponent */}
                <ModalComponent
                    isModalOpen={isModalOpen}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    categories={categories}
                    suppliers={suppliers}
                    onSuccess={handleSuccess}
                    products={products}
                    setProducts={setProducts}
                />
            </div>
        </div>
    );
}

export default AdminProduct;
