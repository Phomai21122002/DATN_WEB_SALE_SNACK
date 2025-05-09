import request from '../request';

export const CreatePaymentVnpay = async (data) => {
    const res = await request.post(`/payment/create`, data);
    console.log(res.data);
    return res.data;
};

export const GetPaymentVnpay = async (params) => {
    const res = await request.get(`/payment?${params.toString()}`);
    return res.data;
};
