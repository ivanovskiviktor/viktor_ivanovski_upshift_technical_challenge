import axios from 'axios';
import { Product } from '../models/Product';

const API_BASE_URL = 'https://my-json-server.typicode.com/drakulovski/dbplaceholder';

export const simulateAddProduct = async (productData: any, lastProductId: number): Promise<Product> => {
    try {
        await axios.post<Product>(
            `${API_BASE_URL}/products`,
            productData,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        return {
            id: lastProductId,
            ...productData,
        };
    } catch (error) {
        throw new Error('Failed to add product');
    }
};
