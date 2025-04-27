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
        const res = await request.get(`/cart/carts`, {
            params: {
                inputUserId: userId,
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const DeleteCart = async (userId, cartId) => {
    try {
        const res = await request.delete(`/cart`, {
            data: {
                userId: userId,
                cartId: cartId,
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};
