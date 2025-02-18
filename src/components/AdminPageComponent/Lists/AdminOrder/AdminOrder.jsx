import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderPageAdminProduct from '../../HeaderPageAdmin/HederPageAdminProduct.jsx';
import AutoCompleteAdmin from '../../HeaderPageAdmin/AutoCompleteAdmin.jsx';
import TableAdminProduct from './TableAdminProduct.jsx';
import FooterAdmin from '../../FooterAdmin/FooterAdmin.jsx';
import * as Userservice from '../../../../service/Userservice.js';
import { logout } from '../../../../redux/slides/UserSlideV1.js';

function AdminOrder() {
    const [selectedProduct, setSelectedProduct] = useState([]);
    const dispatch = useDispatch();
    const [isActionImport, setIsActionImport] = useState(false);
    const state = useSelector((state) => state);

    useEffect(() => {
        if (isActionImport) {
            setSelectedProduct([]);
            setIsActionImport(false);
        }
    }, [isActionImport]);

    const handleUpdateQuantity = (id, value) => {
        setSelectedProduct((prev) =>
            prev.map((product) => (product._id === id ? { ...product, quantity: value } : product)),
        );
    };

    const handleSelectProduct = (product) => {
        setSelectedProduct((prev) => {
            const isExist = prev.some((item) => item._id === product._id);
            if (!isExist) {
                const newProducts = [...prev, { ...product, quantity: 1 }];

                return newProducts;
            }
            return prev;
        });
    };

    const handleAlo = async () => {
        setSelectedProduct([]);
    };
    const [deliveryAddress, setDeliveryAddress] = useState('');

    return (
        <div>
            <HeaderPageAdminProduct />
            <div style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
                <div style={{ backgroundColor: '#fff', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
                        <input
                            type="text"
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            placeholder="Nhập địa chỉ nhập hàng"
                            style={{
                                width: '40%',
                                fontSize: '12px',
                                borderRadius: '8px',
                                border: '1px solid #ccc',
                            }}
                        />

                        <AutoCompleteAdmin onSelectProduct={handleSelectProduct} />
                    </div>
                    <TableAdminProduct selectedProduct={selectedProduct} onUpdateQuantity={handleUpdateQuantity} />
                </div>
            </div>
            <FooterAdmin
                selectedProduct={selectedProduct}
                isActionImport={isActionImport}
                setIsActionImport={setIsActionImport}
                deliveryAddress={deliveryAddress}
                setDeliveryAddress={setDeliveryAddress}
            />
        </div>
    );
}

export default AdminOrder;
