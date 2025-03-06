import Search from 'antd/es/transfer/search';
import styles from '../../AdminPageComponent/HeaderPageAdmin/HeaderPageAdminProduct.module.scss';

import { AutoComplete, Dropdown, Input, message } from 'antd';
import AutoCompleteAdmin from '../HeaderPageAdmin/AutoCompleteAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllProducts } from '../../../../src/redux/slides/ProductSlide';
import {
    BellOutlined,
    MoonOutlined,
    SettingOutlined,
    UserOutlined,
    GlobalOutlined,
    LogoutOutlined,
    UserAddOutlined,
    LoginOutlined,
} from '@ant-design/icons';
import { logout } from '../../../redux/slides/UserSlideV1';
import * as UserService from '../../../service/Userservice';
import { useNavigate } from 'react-router-dom';
import Notification from '../../NotificationComponent/Notification';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { searchElastic } from '../../../service/Productservice';
function HeaderPageAdminProduct({ setsearchProduct }) {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteAllProducts());
    };
    const user = useSelector((state) => state.userv1);
    const items = [
        {
            key: '1',
            label: 'Thiết lập tài khoản',
            icon: <SettingOutlined />,
            onClick: () => handleMenuClick('Thiết lập tài khoản'),
        },
        {
            key: '2',
            label: 'Ngôn ngữ',
            icon: <GlobalOutlined />,
            onClick: () => handleMenuClick('Ngôn ngữ'),
        },
        {
            key: '3',
            label: 'Đăng xuất',
            icon: <LogoutOutlined />,
            onClick: () => handleMenuClick('Đăng xuất'),
        },
        {
            key: '4',
            label: 'Đăng nhập',
            icon: <LoginOutlined />,
            onClick: () => navigate('/sign-in'),
        },
        {
            key: '5',
            label: 'Đăng ký',
            icon: <UserAddOutlined />,
            onClick: () => navigate('/sign-up'),
        },

        {
            key: '4',
            label: `Email : ${user.email}`,
        },
    ];

    const navigate = useNavigate();
    const handleMenuClick = async (label) => {
        if (label === 'Đăng xuất') {
            try {
                await UserService.logoutUser();
                dispatch(logout());
                dispatch(deleteAllProducts());
                message.success('Đăng xuất thành công!');
                navigate('/sign-in');
            } catch (error) {
                message.error('Đăng xuất thất bại!');
                console.error('Lỗi khi đăng xuất:', error);
            }
        } else if (label === 'Thiết lập tài khoản') {
            navigate('/profile_page');
        }
    };

    const [search, setSearch] = useState('');

    const debouncedSearch = useCallback(
        _.debounce((value) => {
            fetchSearchResults(value);
        }, 1000),
        [],
    );

    const fetchSearchResults = async (query) => {
        try {
            const response = await searchElastic({ querySearch: query });
            setsearchProduct(response.data.ingredients);
        } catch (error) {
            console.error('❌ Lỗi khi tìm kiếm:', error);
        }
    };

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    console.log(user);

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.wrapperList} ${styles.searchSection}`}>
                <h1>Tổng quan</h1>
            </div>

            <div className={`${styles.wrapperList} ${styles.iconSection}`}>
                <div className={styles.wrapperItem} onClick={handleDelete}>
                    <SettingOutlined />
                </div>

                <div className={styles.wrapperItem}>
                    <MoonOutlined />
                </div>

                <div className={styles.wrapperItem}>
                    <Notification></Notification>
                </div>

                <Dropdown menu={{ items }} placement="bottomLeft">
                    <div className={styles.wrapperItem}>
                        {user._id === '' ? <UserOutlined /> : <img className={styles.avatar} src={user?.avatar}></img>}
                    </div>
                </Dropdown>
            </div>
        </div>
    );
}

export default HeaderPageAdminProduct;
