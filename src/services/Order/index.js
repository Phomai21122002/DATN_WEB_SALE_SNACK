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

export const GetOrdersProduct = async (userId, Status) => {
    const res = await request.get(`/order/orders`, {
        params: {
            inputUserId: userId,
            inputStatus: Status,
        },
    });
    return res.data;
};

export const GetOrderProductAdmin = async ({
    userId,
    isPriceDecsending,
    Status,
    PageNumber,
    PageSize,
    StartDate = '',
    EndDate = '',
}) => {
    const res = await request.get(`/order/orders`, {
        params: { inputUserId: userId, inputStatus: Status },
    });
    return res.data;
};

export const GetOrderById = async (orderId, userId) => {
    const res = await request.get(`/order/order`, {
        params: {
            inputUserId: userId,
            orderId: orderId,
        },
    });
    return res.data;
};

export const GetOrderProductInOrder = async ({
    userId,
    isPriceDecsending,
    Status,
    PageNumber,
    PageSize,
    StartDate = '',
    EndDate = '',
}) => {
    const res = await request.get(`/order/ProductInOrders`, {
        params: { inputUserId: userId, inputStatus: Status },
    });
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

export const RemoveSoftOrder = async ({ userId, orderId }) => {
    const res = await request.delete(`/order/Soft-Delete`, {
        params: {
            inputUserId: userId,
            inputOrderId: orderId,
        },
    });
    return res.data;
};

export const RemoveOrder = async ({ userId, orderId }) => {
    const res = await request.delete(`/order`, {
        params: {
            inputUserId: userId,
            inputOrderId: orderId,
        },
    });
    return res.data;
};
