import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Space, message } from 'antd';
import * as OrderService from '../../../service/OrderService';
import { formatVND } from '../../../ultil/index';
import { useDispatch, useSelector } from 'react-redux';

const DropdownPage = ({ selectedProduct, handleTotalPrice, isActionImport, setIsActionImport }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const dispatch = useDispatch();

    console.log('setIsActionImport,setIsActionImpo', isActionImport);

    useEffect(() => {
        let total = selectedProduct.reduce((acc, product) => acc + product.quantity * product.price, 0);
        setTotalPrice(formatVND(total));
        handleTotalPrice(total);
    }, [selectedProduct]);

    const handleMenuClick = async (label) => {
        if (label === 'Nhập hàng') {
            if (!selectedProduct || selectedProduct.length === 0) {
                message.warning('Vui lòng chọn ít nhất một sản phẩm!');
                return;
            }

            const data = {
                userId: '65c6a7f9e8b3f2d5a4c12345',
                items: selectedProduct.map((product) => ({
                    ingredientsId: product._id,
                    quantity: product.quantity || 1,
                    status: 'pending',
                })),
                totalPrice: totalPrice,
            };

            message.info('Đang nhập hàng...');
            try {
                const res = await OrderService.createOrder(data);
                message.success('Nhập hàng thành công!');
                setIsActionImport(true);
            } catch (error) {
                message.error('Tạo đơn hàng thất bại');
            }
        }
    };

    const items = [
        {
            key: '1',
            label: 'Xác nhận đơn hàng',
            onClick: () => handleMenuClick('Xác nhận đơn hàng'),
        },
        {
            key: '2',
            label: 'Gửi hàng đi',
            onClick: () => handleMenuClick('Gửi hàng đi'),
        },
        {
            key: '3',
            label: 'Nhập hàng',
            onClick: () => handleMenuClick('Nhập hàng'),
        },
    ];

    return (
        <Space direction="vertical">
            <Space wrap>
                <Dropdown menu={{ items }} placement="topRight">
                    <Button>Lưu</Button>
                </Dropdown>
            </Space>
        </Space>
    );
};

export default DropdownPage;
