import React from 'react';
import { Button, Dropdown, Space, message } from 'antd';
import * as OrderService from '../../../service/OrderService';

const DropdownPage = ({ selectedProduct }) => {
    console.log('Danh sách sản phẩm trong Dropdown:', selectedProduct);

    const handleMenuClick = async (label) => {
        if (label === 'Nhập hàng') {
            if (selectedProduct.length === 0) {
                message.warning('Vui lòng chọn ít nhất một sản phẩm!');
                return;
            }

            // {
            //     "userId": "65c6a7f9e8b3f2d5a4c12345",
            //     "items": [
            //       {
            //         "ingredientsId": "67a974febc0b7959c7e5c3c2",
            //         "quantity": 2,
            //         "status": "pending"
            //       },
            //       {
            //         "ingredientsId": "67a9750cbc0b7959c7e5c3c4",
            //         "quantity": 5,
            //         "status": "pending"
            //       }
            //     ],
            //     "createdAt": "2025-02-10T12:00:00.000Z",
            //     "updatedAt": "2025-02-10T12:30:00.000Z"
            //   }

            message.info('Đang nhập hàng...');
            try {
                const res = await OrderService.createOrder({ selectedProduct }); // Gửi sản phẩm lên API
                console.log('Kết quả API:', res);
                message.success('Nhập hàng thành công!');
            } catch (error) {
                message.error('Tạo đơn hàng thất bại');
                console.error(error);
            }
        } else if (label === 'Gửi hàng đi') {
            message.info('Đã gửi hàng đi thành công');
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
