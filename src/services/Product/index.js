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

export const GetProduct = async ({ slug }) => {
    console.log(slug);
    try {
        const res = await request.get(`/product/products`, {
            params: {
                slug,
            },
        });
        console.log(res.data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const AddProduct = async (data) => {
    try {
        const res = await request.post(`/Products/admin`, data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const AdminUpdateProduct = async (data) => {
    try {
        const id = data?.id;
        const res = await request.put(`/Products/admin/${id}`, data);
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
