import request from '../request';

export const AddCart = async (data) => {
    try {
        const res = await request.post(`/Cart`, data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const UpdateCart = async (data) => {
    try {
        const res = await request.put(`/Cart`, data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const GetCart = async (PageNumber, PageSize) => {
    try {
        const res = await request.get(`/Cart`, {
            params: {
                PageNumber,
                PageSize,
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const DeleteCart = async (cartId) => {
    try {
        const res = await request.delete(`/Cart/${cartId}`);
        return res.data;
    } catch (error) {
        throw error;
    }
};
