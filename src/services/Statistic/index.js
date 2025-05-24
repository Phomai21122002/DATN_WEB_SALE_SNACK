import request from '../request';

export const GetStatistic = async () => {
    const res = await request.get(`/statistic`);
    return res.data;
};
