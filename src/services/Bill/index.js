import request from '../request';

export const GetBill = async ({ userId, billId }) => {
    const res = await request.get(`/bill/bill`, {
        params: {
            inputUserId: userId,
            billId,
        },
    });
    return res.data;
};

export const GetBills = async ({ userId, PageNumber = 1, PageSize = 10 }) => {
    const res = await request.get(`/bill/bills`, {
        params: {
            inputUserId: userId,
            PageNumber,
            PageSize,
        },
    });
    return res.data;
};

export const GetBillsAdmin = async ({ PageNumber = 1, PageSize = 10 }) => {
    const res = await request.get(`/bill/admin/bills`, {
        params: {
            PageNumber,
            PageSize,
        },
    });
    return res.data;
};

export const CreateBillOrder = async (orderId, userId) => {
    const res = await request.post(`/bill`, null, {
        params: {
            inputUserId: userId,
            inputOrderId: orderId,
        },
    });
    return res.data;
};
