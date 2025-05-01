import request from '../request';

export const OrderProduct = async (userId, data) => {
    try {
        const res = await request.post(`/order`, data, {
            params: {
                inputUserId: userId,
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const UpdateOrderProduct = async (orderId, data) => {
    try {
        const res = await request.patch(`/Order/${orderId}`, data);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const GetOrdersProduct = async (userId) => {
    try {
        const res = await request.get(`/order/orders`, {
            params: {
                inputUserId: userId,
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const GetOrderProductAdmin = async ({
    userId,
    isPriceDecsending,
    Status = '',
    PageNumber,
    PageSize,
    StartDate = '',
    EndDate = '',
}) => {
    try {
        const res = await request.get(`/order/orders`, {
            params: { inputUserId: userId },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const GetOrderById = async (orderId, userId) => {
    try {
        const res = await request.get(`/Order/admin/getorderbyid/${orderId}`, {
            params: {
                userId: userId,
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const GetOrderByUserId = async ({
    id,
    isPriceDecsending,
    Status = '',
    PageNumber,
    PageSize,
    StartDate = '',
    EndDate = '',
}) => {
    try {
        const res = await request.get(`/Order/admin/getbyuserid/${id}`, {
            params: {
                id,
                isPriceDecsending,
                Status,
                PageNumber,
                PageSize,
                StartDate,
                EndDate,
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};
