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

export const GetProductsByIdCategory = async ({ categoryId, isDecsending, PageNumber = 1, PageSize = 10 } = {}) => {
    console.log(isDecsending);
    const res = await request.get('/product/productsByIdCategory', {
        params: {
            categoryId,
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
    const res = await request.delete(`/product/soft-delete`, {
        params: {
            productId: id,
        },
    });
    return res.data;
};

export const RemoveProductOrder = async ({ userId, orderId, productId }) => {
    const res = await request.patch('/order/CancelProductOrder', null, {
        params: {
            inputUserId: userId,
            inputOrderId: orderId,
            inputProductId: productId,
        },
    });
    return res.data;
};

export const GetRecommenedProductBySlug = async ({ slug }) => {
    const res = await request.get(`http://127.0.0.1:8000/api`, {
        params: {
            slug: slug,
        },
    });
    console.log(res.data);
    return res.data;
};
