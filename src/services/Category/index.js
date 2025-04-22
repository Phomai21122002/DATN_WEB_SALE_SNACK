import request from '../request';

export const GetCategories = async () => {
    try {
        const res = await request.get('/Categories');
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const GetCategory = async ({ id }) => {
    try {
        const res = await request.get(`/Categories/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const AddCategory = async (data) => {
    try {
        const res = await request.post(`/Categories/admin`, data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const GetSoftDeleteCategories = async () => {
    try {
        const res = await request.get('/Categories/admin/soft-delete-list');
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
        const res = await request.put(`/Categories/admin/${id}`, data);
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
