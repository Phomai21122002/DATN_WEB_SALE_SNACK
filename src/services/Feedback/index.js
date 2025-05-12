import request from '../request';

export const CreateFeedBack = async (userId, data) => {
    const res = await request.post(`/feedback`, data, {
        params: {
            inputUserId: userId,
        },
    });
    console.log(res.data);
    return res.data;
};

export const GetFeedBacks = async ({ userId, productId }) => {
    const res = await request.get(`/feedback/feedbacks`, {
        params: {
            inputUserId: userId,
            productId: productId,
        },
    });
    console.log(res.data);
    return res.data;
};
