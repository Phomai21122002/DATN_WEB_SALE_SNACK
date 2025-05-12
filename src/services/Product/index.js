import request from '../request';

export const GetProducts = async ({
    Name,
    SortBy = null,
    isDecsending = false,
    PageNumber = 1,
    PageSize = 10,
} = {}) => {
    const res = await request.get('/product/products', {
        params: {
            Name,
            SortBy,
            isDecsending,
            PageNumber,
            PageSize,
        },
    });
    return res.data;
};

export const GetProduct = async ({ id }) => {
    const res = await request.get(`/product/products`, {
        params: {
            productId: id,
        },
    });
    return res.data;
};

export const GetProductBySlug = async ({ slug }) => {
    const res = await request.get(`/product/productBySlug`, {
        params: {
            slugProduct: slug,
        },
    });
    return res.data;
};

export const AddProduct = async (categoryId, data) => {
    const res = await request.post(`/product`, data, {
        params: {
            categoryId: categoryId,
        },
    });
    return res.data;
};

export const AdminUpdateProduct = async (productId, categoryId, data) => {
    const res = await request.put(`/product`, data, {
        params: {
            productId: productId,
            categoryId: categoryId,
        },
    });
    return res.data;
};

export const AdminDeleteProduct = async (id) => {
    const res = await request.delete(`/Products/admin/${id}`);
    return res.data;
};
