import request from '../request';

export const OrderProduct = async (data) => {
    try {
        const res = await request.post(`/Order`, data);
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

export const GetOrderProduct = async ({
    isPriceDecsending = false,
    Status = '',
    PageNumber,
    PageSize,
    StartDate = '',
    EndDate = '',
} = {}) => {
    try {
        const res = await request.get(`/Order`, {
            params: {
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
