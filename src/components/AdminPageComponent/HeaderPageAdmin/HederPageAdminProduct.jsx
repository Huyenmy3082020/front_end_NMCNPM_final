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
            <div className={`${styles.wrapperList} ${styles.searchSection}`}>
                <AutoCompleteAdmin onSelectProduct={onSelectProduct} />
            </div>

            <div className={`${styles.wrapperList} ${styles.iconSection}`}>
                <div className={styles.wrapperItem}>
                    <GiaoDien />
                </div>
                <div className={styles.wrapperItem}>
                    <FullScreen />
                </div>
                <div className={styles.wrapperItem}>
                    <MessageAdmin />
                </div>
                <div className={styles.wrapperItem}>
                    <Notification />
                </div>
                <div className={styles.wrapperItem}>
                    <Notification />
                </div>
                <div className={styles.wrapperItem}>
                    <Notification />
                </div>
            </div>
        </div>

        // <div className={styles.wrapper}>
        //     <div className={styles.wrapperList}>
        //         <AutoCompleteAdmin></AutoCompleteAdmin>
        //     </div>
        //     <div className={styles.wrapperList}>
        //         <div className={styles.wrapperItem}>
        //             <GiaoDien></GiaoDien>
        //         </div>
        //         <div className={styles.wrapperItem}>
        //             <FullScreen></FullScreen>
        //         </div>
        //         <div className={styles.wrapperItem}>
        //             {' '}
        //             <MessageAdmin></MessageAdmin>
        //         </div>
        //         <div className={styles.wrapperItem}>
        //             <Notification></Notification>
        //         </div>
        //         <div className={styles.wrapperItem}>
        //             <Notification></Notification>
        //         </div>
        //         <div className={styles.wrapperItem}>
        //             <Notification></Notification>
        //         </div>
        //     </div>
        // </div>
    );
}

export default HeaderPageAdminProduct;
