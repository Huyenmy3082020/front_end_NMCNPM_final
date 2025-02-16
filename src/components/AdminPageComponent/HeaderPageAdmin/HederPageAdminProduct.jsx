import Search from 'antd/es/transfer/search';
import styles from '../../AdminPageComponent/HeaderPageAdmin/HeaderPageAdminProduct.module.scss';

import { AutoComplete, Dropdown, message } from 'antd';
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
} from '@ant-design/icons';
import { logout } from '../../../redux/slides/UserSlideV1';
import * as UserService from '../../../service/Userservice';
import { useNavigate } from 'react-router-dom';
function HeaderPageAdminProduct({ onSelectProduct }) {
    const dispatch = useDispatch();
    const handleDelete = () => {
        // delete all products
        dispatch(deleteAllProducts());
    };

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
    ];

    const navigate = useNavigate();
    const handleMenuClick = async (label) => {
        if (label === 'Đăng xuất') {
            try {
                await UserService.logoutUser(); // Gọi API logout trước
                dispatch(logout()); // Xóa dữ liệu user trong Redux
                message.success('Đăng xuất thành công!');
                navigate('/sign-in'); // Điều hướng về trang đăng nhập
            } catch (error) {
                message.error('Đăng xuất thất bại!');
                console.error('Lỗi khi đăng xuất:', error);
            }
        }
    };

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
                    <BellOutlined />
                </div>
                <Dropdown menu={{ items }} placement="bottomLeft">
                    <div className={styles.wrapperItem}>
                        <UserOutlined />
                    </div>
                </Dropdown>
            </div>
        </div>
    );
}

export default HeaderPageAdminProduct;
