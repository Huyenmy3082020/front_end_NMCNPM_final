import Search from 'antd/es/transfer/search';
import styles from '../../AdminPageComponent/HeaderPageAdmin/HeaderPageAdminProduct.module.scss';
import {
    Discount,
    FullScreen,
    GiaoDien,
    IconDashboard,
    IconStart,
    Login,
    MessageAdmin,
    Notification,
    ThongTinThanhToan,
    TotalSell,
    User,
} from '../../IconComponent/IconComponent';
import { AutoComplete } from 'antd';
import AutoCompleteAdmin from '../HeaderPageAdmin/AutoCompleteAdmin';
import { useSelector } from 'react-redux';

function HeaderPageAdminProduct({ onSelectProduct }) {
    const user = useSelector((state) => state.userv1);
    console.log(user.avatar);

    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapperList}>
                <AutoCompleteAdmin onSelectProduct={onSelectProduct} />
            </div>

            <div className={styles.wrapperList}>
                <div className={styles.wrapperItem}>
                    <Notification></Notification>
                </div>
                <div className={styles.wrapperItem}>
                    <User></User>
                </div>

                <div className={styles.wrapperItem}>
                    <img src={user.avatar} alt="" />
                </div>
            </div>
        </div>
    );
}

export default HeaderPageAdminProduct;
