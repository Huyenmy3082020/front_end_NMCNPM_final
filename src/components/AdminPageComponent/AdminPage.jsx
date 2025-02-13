import React, { useState } from 'react';
import {
    BankOutlined,
    DashboardFilled,
    LogoutOutlined,
    OrderedListOutlined,
    ProductOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import AdminProduct from '../AdminPageComponent/Lists/AdminProduct/AdminProduct';
import AdminUser from '../AdminPageComponent/Lists/AdminUser/AdminUser';

import DashboardPage from '../../components/AdminPageComponent/Main/DashboardPage';
import AdminOrder from './Lists/AdminOrder/AdminOrder';
import AdminInvoidIn from './Lists/AdminInvoidIn/AdminInvoidIn';

const items = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        icon: <DashboardFilled />,
    },
    {
        key: 'user',
        label: 'User',
        icon: <UserOutlined />,
    },
    {
        key: 'product',
        label: 'Product',
        icon: <ProductOutlined></ProductOutlined>,
    },
    {
        key: 'order',
        label: 'Order',
        icon: <OrderedListOutlined></OrderedListOutlined>,
    },
    {
        key: 'invoice',
        label: 'invoice',
        icon: <OrderedListOutlined></OrderedListOutlined>,
        children: [
            {
                key: 'invoid-in',
                label: 'invoid-in',
                icon: <OrderedListOutlined></OrderedListOutlined>,
            },
            {
                key: 'invoid-out',
                label: 'invoid-out',
                icon: <OrderedListOutlined></OrderedListOutlined>,
            },
        ],
    },
    {
        key: 'balance',
        label: 'Balance',
        icon: <BankOutlined></BankOutlined>,
    },

    {
        key: 'logout',
        label: 'Log out',
        icon: <LogoutOutlined></LogoutOutlined>,
    },
];
const renderPage = (key) => {
    switch (key) {
        case 'user':
            return <AdminUser></AdminUser>;
        case 'product':
            return <AdminProduct></AdminProduct>;
        case 'order':
            return <AdminOrder></AdminOrder>;
        case 'invoid-in':
            return <AdminInvoidIn></AdminInvoidIn>;
        case 'invoid-out':
            return <AdminOrder></AdminOrder>;
        case 'dashboard':
            return <DashboardPage></DashboardPage>;

        default: {
            return <></>;
        }
    }
};
const App = () => {
    const [selectedKey, setSelectedKey] = useState('product');

    const onClick = (e) => {
        setSelectedKey(e.key);
    };

    return (
        <>
            <div style={{ display: 'flex' }}>
                <Menu
                    onClick={onClick}
                    style={{
                        width: 256,
                    }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={items}
                />
                <div style={{ width: '1260px' }}>{renderPage(selectedKey)}</div>
            </div>
        </>
    );
};

export default App;
