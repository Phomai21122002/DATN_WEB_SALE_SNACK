import request from '../request';

export const CreateFeedBack = async (userId, data) => {
    const res = await request.post(`/feedback`, data, {
        params: {
            inputUserId: userId,
        },
    });
    return res.data;
};

export const GetFeedBacks = async ({ userId, productId, PageNumber = 1, PageSize = 10 }) => {
    console.log(userId, productId);
    const res = await request.get(`/feedback/feedbacks`, {
        params: {
            inputUserId: userId,
            productId: productId,
            PageNumber,
            PageSize,
        },
    });
    return res.data;
};
