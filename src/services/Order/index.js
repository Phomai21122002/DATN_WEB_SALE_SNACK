import request from '../request';

export const OrderProduct = async (userId, data) => {
    const res = await request.post(`/order`, data, {
        params: {
            inputUserId: userId,
        },
    });
    return res.data;
};

export const UpdateOrderProduct = async (orderId, userId) => {
    const res = await request.patch(`/order`, null, {
        params: {
            inputUserId: userId,
            inputOrderId: orderId,
        },
    });
    return res.data;
};

export const GetOrdersProduct = async (userId) => {
    const res = await request.get(`/order/orders`, {
        params: {
            inputUserId: userId,
        },
    });
    return res.data;
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
    console.log(userId);
    const res = await request.get(`/order/orders`, {
        params: { inputUserId: userId },
    });
    console.log(res.data);
    return res.data;
};

export const GetOrderById = async (orderId, userId) => {
    const res = await request.get(`/order/order`, {
        params: {
            inputUserId: userId,
            orderId: orderId,
        },
    });
    console.log(res.data);
    return res.data;
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
};
