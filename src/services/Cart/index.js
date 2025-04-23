import request from '../request';

export const AddCart = async (data) => {
    try {
        const res = await request.post(`/cart`, data);
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

export const GetCarts = async (userId) => {
    try {
        console.log(userId);
        const res = await request.get(`/cart/carts`, {
            params: {
                inputUserId: userId,
            },
        });
        console.log(res.data);
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
