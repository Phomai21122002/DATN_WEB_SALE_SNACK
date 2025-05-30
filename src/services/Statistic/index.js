import request from '../request';

export const GetStatistic = async () => {
    const res = await request.get(`/statistic`);
    return res.data;
};

export const GetStatisticRevenue = async () => {
    const res = await request.get(`/statistic/revenue`);
    return res.data;
};

export const GetProductsTop = async () => {
    const res = await request.get(`/product/productsTop`);
    return res.data;
};
