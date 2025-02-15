import React, { useEffect, useState } from 'react';
import { Table, InputNumber, Button } from 'antd';
import { update } from '../../../../../service/GoodsDeliveryService';

const GoodsDeliveryTableV1 = ({ selectedDelivery, setSelectedDelivery }) => {
    const [quantities, setQuantities] = useState({});

    // 🔹 Cập nhật state `quantities` khi `selectedDelivery` thay đổi
    useEffect(() => {
        if (selectedDelivery?.items) {
            const initialQuantities = {};
            selectedDelivery.items.forEach((item) => {
                initialQuantities[item._id] = item.quantity;
            });
            setQuantities(initialQuantities);
        }
    }, [selectedDelivery]);

    // 🔹 Xử lý cập nhật số lượng từng sản phẩm
    const onUpdateQuantity = (id, value) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    // 🔹 Tạo danh sách sản phẩm cập nhật từ `selectedDelivery`
    const dataSource = selectedDelivery?.items?.map((item) => ({
        _id: item._id,
        name: item.ingredientName,
        price: item.price,
        quantity: quantities[item._id] || item.quantity,
    }));

    // 🔹 Tính tổng tiền
    const totalPrice = dataSource.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // 🔹 Chuẩn bị dữ liệu để gửi API
    const dataUpdate = {
        totalPrice: totalPrice,
        items: dataSource.map((item) => ({
            _id: item._id,
            quantity: quantities[item._id] || item.quantity,
        })),
    };

    // 🔹 Hàm cập nhật đơn hàng
    const handleUpdate = async () => {
        try {
            console.log('🔹 Trước khi cập nhật:', selectedDelivery);
            console.log('🔹 Dữ liệu gửi đi:', JSON.stringify(dataUpdate, null, 2));

            const a = await update(selectedDelivery._id, dataUpdate.items);
            console.log(a);

            // 🔹 Cập nhật lại `selectedDelivery` sau khi update thành công
            const updatedDelivery = {
                ...selectedDelivery,
                items: selectedDelivery.items.map((item) => {
                    const updatedItem = dataUpdate.items.find((i) => i._id === item._id);
                    return updatedItem ? { ...item, quantity: updatedItem.quantity } : item;
                }),
                totalPrice: totalPrice,
            };

            console.log('✅ Sau khi cập nhật:', updatedDelivery);
            setSelectedDelivery(updatedDelivery);
        } catch (error) {
            console.error('❌ Lỗi cập nhật:', error);
            alert('Có lỗi xảy ra khi cập nhật đơn hàng');
        }
    };

    // 🔹 Cấu hình các cột cho bảng
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
                const total = record.price * record.quantity;
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
