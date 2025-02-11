import React, { useEffect, useState } from 'react';
import { AutoComplete } from 'antd';
import * as IngredientService from '../../../service/Productservice';

const AutoCompleteAdmin = ({ onSelectProduct }) => {
    const [products, setProducts] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchIngredient = async () => {
            try {
                const res = await IngredientService.getAllIngredient();
                console.log('res:', res.data.ingredients);
                const ingredients = res.data.ingredients || [];
                setProducts(ingredients);

                // Tạo danh sách options cho AutoComplete
                setOptions(
                    ingredients.map((item) => ({
                        value: item.name, // Giá trị hiển thị
                        label: item.name, // Nhãn hiển thị
                        product: item, // Lưu toàn bộ object
                    })),
                );
            } catch (error) {
                console.error('Error fetching ingredients:', error);
            }
        };

        fetchIngredient();
    }, []);

    const handleSelect = (value, option) => {
        console.log('Sản phẩm được chọn:', option.product);
        if (onSelectProduct) {
            onSelectProduct(option.product);
        }
    };

    return (
        <AutoComplete
            style={{ width: 500 }}
            options={options}
            placeholder="Nhập tên sản phẩm..."
            filterOption={(inputValue, option) => option.value.toUpperCase().includes(inputValue.toUpperCase())}
            onSelect={handleSelect}
        />
    );
};

export default AutoCompleteAdmin;
