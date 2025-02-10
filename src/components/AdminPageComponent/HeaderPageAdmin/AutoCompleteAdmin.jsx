import React, { useEffect, useState } from 'react';
import { AutoComplete } from 'antd';
import * as IngredientService from '../../../service/Productservice';

// Chuyển danh sách products thành options

const AutoCompleteAdmin = () => {
    const [products, setIngredients] = useState([]);
    useEffect(() => {
        const fetchIngredient = async () => {
            try {
                const res = await IngredientService.getAllIngredient();
                console.log('res:', res.data.ingredients);
                setIngredients(res.data.ingredients || []);
            } catch (error) {
                console.error('Error fetching ingredients:', error);
            }
        };

        fetchIngredient();
    }, []);
    const options = products.map((product) => ({
        value: product.name,
        id: product._id,
    }));

    const handleSelect = (id) => {
        console.log('Giá trị được chọn:', id);
    };

    return (
        <AutoComplete
            style={{ width: 300 }}
            options={options}
            placeholder="Nhập tên sản phẩm..."
            filterOption={(inputValue, option) => option.value.toUpperCase().includes(inputValue.toUpperCase())}
            onSelect={handleSelect} // Gọi hàm khi chọn giá trị
        />
    );
};

export default AutoCompleteAdmin;
