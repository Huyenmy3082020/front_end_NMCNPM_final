import React, { useEffect, useState } from 'react';
import { Table, InputNumber, Button, message } from 'antd';
import { update } from '../../../../../service/GoodsDeliveryService';

const GoodsDeliveryTableV1 = ({ selectedDelivery, setSelectedDelivery, setIsModalVisible }) => {
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        if (selectedDelivery?.items) {
            const initialQuantities = {};
            selectedDelivery.items.forEach((item) => {
                initialQuantities[item._id] = item.quantity;
            });
            setQuantities(initialQuantities);
        }
    }, [selectedDelivery]);

    const onUpdateQuantity = (id, value) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    // 🔹 Chỉnh sửa dataSource để lấy đúng dữ liệu
    const dataSource = selectedDelivery?.items?.map((item) => ({
        _id: item._id,
        name: item.ingredientNameAtPurchase, // ✅ Lấy đúng tên sản phẩm
        price: item.priceAtPurchase, // ✅ Lấy đúng giá tại thời điểm đặt hàng
        quantity: quantities[item._id] || item.quantity, // ✅ Cập nhật số lượng
    }));

    // 🔹 Tính tổng tiền dựa trên số lượng cập nhật
    const totalPrice = dataSource.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);

    const dataUpdate = {
        items: selectedDelivery.items.map((item) => ({
            _id: item._id,
            quantity: quantities[item._id] || item.quantity,
            priceAtPurchase: item.priceAtPurchase, // ✅ Dữ liệu chuẩn
            ingredientNameAtPurchase: item.ingredientNameAtPurchase,
            ingredientsId: item.ingredientsId,
        })),
    };

    const handleUpdate = async () => {
        try {
            await update(selectedDelivery._id, dataUpdate);
            setIsModalVisible(false);
            message.success('Cập nhật đơn hàng thành công!');
        } catch (error) {
            console.error('❌ Lỗi cập nhật:', error);
            message.error('Có lỗi xảy ra khi cập nhật đơn hàng');
        }
    };

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
            render: (price) =>
                price ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price) : 'N/A',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_, record) => (
                <InputNumber
                    min={1}
                    value={quantities[record._id] || record.quantity}
                    onChange={(value) => onUpdateQuantity(record._id, value)}
                    style={{ width: '80px' }}
                />
            ),
        },
        {
            title: 'Tổng tiền',
            key: 'total',
            render: (_, record) => {
                const total = (record.price || 0) * (record.quantity || 1);
                return (
                    <strong>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
                    </strong>
                );
            },
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={dataSource} rowKey="_id" pagination={false} />
            <div style={{ marginTop: '10px', textAlign: 'right', fontSize: '16px', fontWeight: 'bold', color: 'red' }}>
                Tổng tiền: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
            </div>

            <Button type="primary" style={{ marginTop: '10px' }} onClick={handleUpdate}>
                Cập nhật đơn hàng
            </Button>
        </div>
    );
};

export default GoodsDeliveryTableV1;
