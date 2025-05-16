import request from '../request';

export const GetPaymentVnpay = async (params) => {
    const res = await request.get(`/payment?${params.toString()}`);
    return res.data;
};

export const GetPaymentMomo = async (params) => {
    const res = await request.get(`/payment/momo?${params.toString()}`);
    return res.data;
};
