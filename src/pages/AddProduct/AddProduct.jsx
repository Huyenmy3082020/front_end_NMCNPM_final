import React, { useState, useEffect } from 'react';
import styles from '../../pages/AddProduct/AddProduct.module.scss';
import * as CategorySevice from '../../service/CategoriService';
import * as ProductService from '../../service/Productservice';
import HeaderPageAdminProduct from '../../components/AdminPageComponent/HeaderPageAdmin/HederPageAdminProduct';

import { Col, Row } from 'antd';
import { Alert } from 'antd';

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        image: '',
        price: '',
        countInStock: '',
        discount: '',
        description: '',
        details: {},
        category: '',
        brand: '',
        tags: [],
        weight: '',
        createdBy: '',
        dimensions: {
            length: '',
            width: '',
            height: '',
        },
        expiryDate: '',
        isFeatured: false,
        customDetails: [],
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await CategorySevice.getCategoryname();
                setCategories(data); // Lưu danh sách vào state
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDetailChange = (e, key) => {
        const { value } = e.target;
        setProduct((prev) => ({
            ...prev,
            details: {
                ...prev.details,
                [key]: value,
            },
        }));
    };

    const handleDimensionChange = (e, dimensionKey) => {
        const { value } = e.target;
        setProduct((prev) => ({
            ...prev,
            dimensions: {
                ...prev.dimensions,
                [dimensionKey]: value,
            },
        }));
    };

    const handleTagChange = (e) => {
        const { value } = e.target;
        setProduct((prev) => ({
            ...prev,
            tags: value.split(',').map((tag) => tag.trim()), // Split tags by comma
        }));
    };

    const handleCustomDetailChange = (e, index, field) => {
        const { value } = e.target;
        const updatedCustomDetails = [...product.customDetails];
        updatedCustomDetails[index] = {
            ...updatedCustomDetails[index],
            [field]: value,
        };
        setProduct((prev) => ({
            ...prev,
            customDetails: updatedCustomDetails,
        }));
    };

    const addCustomDetail = () => {
        setProduct((prev) => ({
            ...prev,
            customDetails: [...prev.customDetails, { key: '', value: '' }],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let imageUrl = '';
            console.log(product.image);

            if (product.image) {
                const formData = new FormData();
                formData.append('image', product.image); // Gửi tệp thực tế

                const imageResponse = await ProductService.uploadImageProduct(formData);
                imageUrl = imageResponse.imageUrl; // URL ảnh đã tải lên
            }

            const productData = { ...product, image: imageUrl };

            // Tiến hành tạo sản phẩm
            const result = await ProductService.createProduct(productData);
            console.log('Product added successfully:', result);
            <Alert message="Success Text" type="success" />;
            return result;
        } catch (err) {
            console.error('Error adding product:', err);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProduct((prev) => ({
                ...prev,
                image: file,
            }));
        }
    };
    return (
        <div>
            <HeaderPageAdminProduct></HeaderPageAdminProduct>
            <div className={styles.wrapper}>
                <form onSubmit={handleSubmit} className={styles.wrapper}>
                    <h1>Thêm sản phẩm mới</h1>

                    <Row>
                        {/* Tên sản phẩm */}
                        <Col span={8}>
                            {' '}
                            <div className={styles.wrapperItem}>
                                <label className={styles.wrapperLabel}>Tên sản phẩm</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={product.name}
                                    onChange={handleChange}
                                    className={styles.wrapperInput}
                                />
                            </div>
                            {/* Hình ảnh */}
                            <div className={styles.wrapperItem}>
                                <label className={styles.wrapperLabel}>Hình ảnh</label>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*" // Cho phép người dùng chọn các tệp hình ảnh
                                    onChange={handleFileChange} // Hàm xử lý thay đổi tệp
                                />
                            </div>
                            <div className={styles.wrapperItem}>
                                <label className={styles.wrapperLabel}>Số lượng tồn</label>
                                <input
                                    type="text"
                                    name="countInStock"
                                    value={product.countInStock}
                                    onChange={handleChange}
                                    className={styles.wrapperInput}
                                />
                            </div>
                            <div className={styles.wrapperItem}>
                                <label className={styles.wrapperLabel}>Chi tiết sản phẩm</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={product.description}
                                    onChange={handleChange}
                                    className={styles.wrapperInput}
                                />
                            </div>
                            {/* Giá */}
                            <div className={styles.wrapperItem}>
                                {' '}
                                <label className={styles.wrapperLabel}>Giá</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={product.price}
                                    onChange={handleChange}
                                    className={styles.wrapperInput}
                                />
                            </div>
                        </Col>

                        {/* Danh mục */}
                        <Col span={8}>
                            <div className={styles.wrapperItem}>
                                <label className={styles.wrapperLabel}>Danh mục</label>
                                <select
                                    name="category"
                                    value={product.category}
                                    onChange={handleChange}
                                    className={styles.wrapperInput}
                                >
                                    <option value="">Chọn danh mục</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Kích thước */}
                            <div className={styles.wrapperItem}>
                                <label className={styles.wrapperLabel}>Kích thước (cm)</label>
                                <div className={styles.dimensionsWrapper}>
                                    {['length', 'width', 'height'].map((dim) => (
                                        <div key={dim} className={styles.detailField}>
                                            <label style={{ display: 'block', width: '16px', marginBottom: '8px' }}>
                                                {dim}
                                            </label>
                                            <input
                                                type="number"
                                                value={product.dimensions[dim]}
                                                onChange={(e) => handleDimensionChange(e, dim)}
                                                className={styles.wrapperInput}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Col>
                        {/* Thông tin chi tiết */}
                        <Col span={8}>
                            <div className={styles.wrapperItem}>
                                <label className={styles.headingLableInfo}>Thông tin chi tiết</label>
                                <div className={styles.detailsWrapper}>
                                    {Object.keys(product.details).map((key) => (
                                        <div key={key} className={styles.detailField}>
                                            <label>{key}</label>
                                            <input
                                                type="text"
                                                value={product.details[key]}
                                                onChange={(e) => handleDetailChange(e, key)}
                                                className={styles.wrapperInput}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Custom Details (Key-Value) */}
                            <div className={styles.wrapperItem}>
                                <label className={styles.wrapperLabel}>Chi tiết tùy chỉnh</label>
                                <div className={styles.customDetailsWrapper}>
                                    {product.customDetails.map((detail, index) => (
                                        <div key={index} className={styles.detailField}>
                                            <input
                                                type="text"
                                                value={detail.key}
                                                onChange={(e) => handleCustomDetailChange(e, index, 'key')}
                                                placeholder="Nhập tên "
                                                className={styles.wrapperInputKey}
                                            />
                                            <input
                                                type="text"
                                                value={detail.value}
                                                onChange={(e) => handleCustomDetailChange(e, index, 'value')}
                                                placeholder="Nhập giá trị "
                                                className={styles.wrapperInputValue}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <button type="button" onClick={addCustomDetail} className={styles.addDetailButton}>
                                    Thêm chi tiết
                                </button>
                            </div>

                            {/* Thẻ tags */}
                            <div className={styles.wrapperItem}>
                                <label className={styles.wrapperLabel}>Tags</label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={product.tags.join(', ')}
                                    onChange={handleTagChange}
                                    className={styles.wrapperInput}
                                    placeholder="Nhập các tag, ngăn cách bằng dấu phẩy"
                                />
                            </div>

                            {/* Thương hiệu */}
                            <div className={styles.wrapperItem}>
                                <label className={styles.wrapperLabel}>Thương hiệu</label>
                                <input
                                    type="text"
                                    name="brand"
                                    value={product.brand}
                                    onChange={handleChange}
                                    className={styles.wrapperInput}
                                />
                            </div>

                            {/* Trọng lượng */}
                            <div className={styles.wrapperItem}>
                                <div className={styles.wrapperLabel}>Trọng lượng (kg)</div>
                                <input
                                    type="number"
                                    name="weight"
                                    value={product.weight}
                                    onChange={handleChange}
                                    className={styles.wrapperInput}
                                />
                            </div>
                            {/* Trọng lượng */}
                            <div className={styles.wrapperItem}>
                                <label className={styles.wrapperLabel}>Giam gia</label>
                                <input
                                    type="number"
                                    name="discount"
                                    value={product.discount}
                                    onChange={handleChange}
                                    className={styles.wrapperInput}
                                />
                            </div>
                        </Col>
                    </Row>
                    {/* Submit */}
                    <button type="submit" className={styles.submitButton}>
                        Thêm sản phẩm
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
