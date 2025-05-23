import request from '../request';

export const GetCategories = async () => {
    try {
        const res = await request.get('/category/categories');
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const GetCategory = async ({ categoryId }) => {
    try {
        const res = await request.get(`/category/category`, {
            params: {
                categoryId: categoryId,
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const AddCategory = async (data) => {
    try {
        const res = await request.post(`/category`, data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const GetSoftDeleteCategories = async (id) => {
    try {
        const res = await request.delete('/category/soft-delete', {
            params: {
                categoryId: id,
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const DeleteSoftCategory = async ({ id }) => {
    try {
        const res = await request.put(`/Categories/admin/soft-delete/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const AdminUpdateCategory = async (id, data) => {
    try {
        const res = await request.put(`/category`, data, {
            params: {
                idCategory: id,
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const DeleteCategory = async ({ id }) => {
    try {
        const res = await request.delete(`/Categories/admin/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
};
