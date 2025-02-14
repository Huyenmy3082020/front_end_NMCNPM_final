import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'antd';
import { fetchGoodsDeliveries } from '../../../../service/GoodsDeliveryService';
import { generateDisplayId } from '../../../../ultil';
import { FolderViewOutlined } from '@ant-design/icons';
import GoodsDeliveryTableV1 from './Update/GoodDeliveryTableV1';

const GoodsDeliveryTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const goods = await fetchGoodsDeliveries();
                const enrichedData = goods.map((delivery) => ({
                    _id: generateDisplayId(delivery._id),
                    userEmail: delivery.userId?.email,
                    userPhone: delivery.userId?.phone,
                    deliveryDate: delivery.deliveryDate,
                    items: delivery.items || [],
                }));

                setData(enrichedData);
            } catch (error) {
                console.error('Error fetching goods deliveries:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Hàm mở modal khi bấm View
    const handleView = (record) => {
        setSelectedDelivery(record);
        setIsModalVisible(true);
    };

    const columns = [
        { title: 'Phiếu Nhập', dataIndex: '_id', key: '_id' },
        { title: 'User Email', dataIndex: 'userEmail', key: 'userEmail' },
        { title: 'User Phone', dataIndex: 'userPhone', key: 'userPhone' },
        {
            title: 'Ngày nhập hàng',
            dataIndex: 'deliveryDate',
            key: 'deliveryDate',
            render: (text) => new Date(text).toLocaleString(),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Button icon={<FolderViewOutlined />} onClick={() => handleView(record)} style={{ marginRight: 8 }}>
                    View
                </Button>
            ),
        },
    ];

    return (
        <>
            <Table columns={columns} dataSource={data} loading={loading} rowKey="_id" />

            {/* Modal hiển thị GoodTableDeliveryTable */}
            <Modal
                title="Chi tiết Phiếu Nhập"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={800} // Điều chỉnh độ rộng modal
            >
                {selectedDelivery && <GoodsDeliveryTableV1 delivery={selectedDelivery} />}
            </Modal>
        </>
    );
};

export default GoodsDeliveryTable;
