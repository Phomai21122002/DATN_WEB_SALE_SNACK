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

export const DeleteFeedBack = async (userId, feedbackId) => {
    const res = await request.delete(`/feedback`, {
        params: {
            inputUserId: userId,
            feedbackId: feedbackId,
        },
    });
    return res.data;
};

export const UpdateFeedBack = async (userId, feedbackId, data) => {
    const res = await request.put(`/feedback`, data, {
        params: {
            inputUserId: userId,
            feedbackId: feedbackId,
        },
    });
    return res.data;
};
