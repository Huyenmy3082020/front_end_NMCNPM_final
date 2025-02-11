import { Dropdown } from 'antd';
import styles from './FooterAdmin.module.scss';
import DropdownPage from '../Dropdown/Dropdown';

function FooterAdmin() {
    return (
        <div className={styles.wrapperList}>
            <div className={styles.footerLeft}>
                <p className={styles.paymentLabel}>💳 Thanh toán</p>
                <p className={styles.paymentMethod}>📦 COD</p>
            </div>
            <div className={styles.footerRight}>
                <DropdownPage />
            </div>
        </div>
    );
}

export default FooterAdmin;
