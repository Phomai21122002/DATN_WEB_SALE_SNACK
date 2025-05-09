import request from '../request';

export const GetRoles = async () => {
    try {
        const res = await request.get(`/role/roles`);
        return res.data;
    } catch (error) {
        throw error;
    }
};
