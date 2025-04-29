import request from '../request';

export const GetProducts = async ({ Name, SortBy, isDecsending = false, PageNumber = 1, PageSize = 10 } = {}) => {
    try {
        // , {
        //     params: {
        //         Name,
        //         SortBy,
        //         isDecsending,
        //         PageNumber,
        //         PageSize,
        //     },
        // }
        const res = await request.get('/product/products');
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const GetProduct = async ({ id }) => {
    try {
        const res = await request.get(`/product/products`, {
            params: {
                productId: id,
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const GetProductBySlug = async ({ slug }) => {
    try {
        const res = await request.get(`/product/productBySlug`, {
            params: {
                slugProduct: slug,
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const AddProduct = async (categoryId, data) => {
    try {
        const res = await request.post(`/product`, data, {
            params: {
                categoryId: categoryId,
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const AdminUpdateProduct = async (productId, categoryId, data) => {
    try {
        const res = await request.put(`/product`, data, {
            params: {
                productId: productId,
                categoryId: categoryId,
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const AdminDeleteProduct = async (id) => {
    try {
        const res = await request.delete(`/Products/admin/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
};
