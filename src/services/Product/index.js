import request from '../request';

export const GetProducts = async ({
    Name,
    SortBy = null,
    isDecsending = false,
    PageNumber = 1,
    PageSize = 10,
    categoryId,
} = {}) => {
    const res = await request.get('/product/products', {
        params: {
            categoryId,
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
    console.log(data);
    const res = await request.post(`/product`, data, {
        params: {
            categoryId: categoryId,
        },
    });
    return res.data;
};

export const AdminUpdateProduct = async (productId, categoryId, data) => {
    console.log(data);

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
    const res = await request.get(`http://127.0.0.1:8000/api/recommender-content`, {
        params: {
            slug: slug,
        },
    });
    return res.data;
};

export const GetRecommenedByUserId = async ({ UserId }) => {
    const res = await request.get(`http://127.0.0.1:8000/api/recommender-collaborative`, {
        params: {
            user_id: UserId,
        },
    });
    return res.data;
};

export const GetRecommenedByUser = async ({ UserId }) => {
    const res = await request.get(`http://127.0.0.1:8000/api/recommender-collaborative-user`, {
        params: {
            user_id: UserId,
        },
    });
    return res.data;
};

export const GetRecommenedByNameProduct = async ({ Name }) => {
    const res = await request.get(`http://127.0.0.1:8000/api/recommender-find`, {
        params: {
            name: Name,
        },
    });
    return res.data;
};
