import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Space, message } from 'antd';
import * as OrderService from '../../../service/OrderService';
import { formatVND } from '../../../ultil/index';
import { useDispatch, useSelector } from 'react-redux';

const DropdownPage = ({
    selectedProduct,
    handleTotalPrice,
    isActionImport,
    setIsActionImport,
    deliveryAddress,
    setDeliveryAddress,
}) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const user = useSelector((state) => state.userv1);

    useEffect(() => {
        let total = selectedProduct.reduce((acc, product) => acc + product.quantity * product.price, 0);
        setTotalPrice(formatVND(total));
        handleTotalPrice(total);
    }, [selectedProduct]);

    console.log(selectedProduct);
    const handleMenuClick = async (label) => {
        if (!selectedProduct || selectedProduct.length === 0) {
            message.warning('Vui lòng chọn ít nhất một sản phẩm!');
            return;
        }

        const data = {
            userId: user._id,
            items: selectedProduct.map((product) => ({
                ingredientsId: product._id,
                ingredientNameAtPurchase: product.name || 'Không xác định', // 🔹 Bổ sung tên nguyên liệu
                quantity: product.quantity || 1,
                priceAtPurchase: product.price || 0, // 🔹 Đảm bảo có giá
                status: 'pending',
            })),
            deliveryAddress: deliveryAddress,
            totalPrice: selectedProduct.reduce(
                (acc, product) => acc + (product.quantity || 1) * (product.price || 0),
                0,
            ),
        };

        if (label === 'Nhập hàng') {
            message.info('Đang nhập hàng...');
            try {
                await OrderService.createOrder(data);
                message.success('Nhập hàng thành công!');
                setDeliveryAddress('');
                setIsActionImport(true);
            } catch (error) {
                message.error('Tạo đơn hàng thất bại');
            }
        } else if (label === 'Gửi hàng') {
            message.info('Đang gửi hàng...');
            try {
                console.log(data);
                await OrderService.Export(data);
                message.success('Gửi hàng thành công!');
                setDeliveryAddress('');
                setIsActionImport(true);
            } catch (error) {
                console.error('Lỗi khi gửi hàng:', error); // In toàn bộ lỗi ra console

                // Kiểm tra lỗi từ server trả về
                const errorMessage = error?.data?.message || 'Đã có lỗi xảy ra, vui lòng thử lại!';
                message.error(errorMessage);
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
            label: 'Gửi hàng',
            onClick: () => handleMenuClick('Gửi hàng'),
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
                    <div>
                        <Button>Lưu</Button>
                    </div>
                </Dropdown>
            </Space>
        </Space>
    );
};

export default DropdownPage;
