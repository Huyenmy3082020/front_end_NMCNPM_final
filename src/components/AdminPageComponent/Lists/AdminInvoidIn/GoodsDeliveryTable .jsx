import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { fetchGoodsDeliveries } from '../../../../service/GoodsDeliveryService';
import { getAllIngredient } from '../../../../service/Productservice';
// import { getDetailUser } from '../../../../service/Userservice';

const GoodsDeliveryTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const goodsDeliveries = await fetchGoodsDeliveries();

                const enrichedData = await Promise.all(
                    goodsDeliveries.data.map(async (delivery) => {
                        // const token =
                        //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YWUxNGJkNjljZTkyOGYzOWM1MmUxOSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczOTQ2MjE3NiwiZXhwIjoxNzQwMzI2MTc2fQ.AVeZN9btNeFfrxzzy5W5oRCLG37ysJ5vDm8nQsjvP5o';
                        // const user = await getDetailUser(delivery.userId, token);

                        const itemsWithDetails = await Promise.all(
                            delivery.items.map(async (item) => {
                                const ingredientRes = await getAllIngredient(item.ingredientsId);
                                const ingredientArray = ingredientRes.data?.ingredients || [];
                                const ingredient = ingredientArray.find((ing) => ing._id === item.ingredientsId) || {};

                                // Ensure that ingredient has the necessary properties
                                return {
                                    name: ingredient.name || 'Unknown',
                                    price: ingredient.price || 0,
                                };
                            }),
                        );

                        return {
                            _id: delivery._id,
                            userEmail: '',
                            userPhone: '',
                            deliveryDate: delivery.deliveryDate,
                            items: itemsWithDetails,
                        };
                    }),
                );

                setData(enrichedData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching goods deliveries:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const columns = [
        {
            title: 'Phiếu Nhập',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'User Email',
            dataIndex: 'userEmail',
            key: 'userEmail',
        },
        {
            title: 'User Phone',
            dataIndex: 'userPhone',
            key: 'userPhone',
        },
        {
            title: 'Ngày nhập hàng',
            dataIndex: 'deliveryDate',
            key: 'deliveryDate',
            render: (text) => new Date(text).toLocaleString(),
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'items',
            key: 'items',
            render: (items) => (
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>
                            <strong>{item.name}</strong> - {item.price}$
                        </li>
                    ))}
                </ul>
            ),
        },
    ];

    return <Table columns={columns} dataSource={data} loading={loading} rowKey="_id" />;
};

export default GoodsDeliveryTable;
