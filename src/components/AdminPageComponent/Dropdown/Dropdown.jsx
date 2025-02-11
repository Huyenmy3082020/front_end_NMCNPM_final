import React from 'react';
import { Button, Dropdown, Space, message } from 'antd';

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

const handleMenuClick = (label) => {
    console.log('Đã chọn:', label);
    message.info(`Bạn đã chọn: ${label}`);
};

const DropdownPage = () => (
    <Space direction="vertical">
        <Space wrap>
            <Dropdown menu={{ items }} placement="topRight">
                <Button>Lưu</Button>
            </Dropdown>
        </Space>
    </Space>
);

export default DropdownPage;
