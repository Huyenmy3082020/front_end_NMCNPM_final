import React, { useState } from 'react';
import {
    AppstoreOutlined,
    BankOutlined,
    DashboardFilled,
    DashboardTwoTone,
    LogoutOutlined,
    MailOutlined,
    OrderedListOutlined,
    ProductOutlined,
    ProfileOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import AdminProduct from '../AdminPageComponent/Lists/AdminProduct/AdminProduct';
import AdminUser from '../AdminPageComponent/Lists/AdminUser/AdminUser';

import DashboardPage from '../../components/AdminPageComponent/Main/DashboardPage';
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
        key: 'balance',
        label: 'Balance',
        icon: <BankOutlined></BankOutlined>,
    },
    {
        key: 'profile',
        label: 'Profile',
        icon: <ProfileOutlined></ProfileOutlined>,
    },
    {
        key: 'setting',
        label: 'Setting',
        icon: <SettingOutlined></SettingOutlined>,
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
