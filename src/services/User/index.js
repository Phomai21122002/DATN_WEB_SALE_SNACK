import request from '../request';

export const GetUsers = async ({ Name, SortBy, isDecsending = false, PageNumber = 1, PageSize = 10 } = {}) => {
    try {
        const res = await request.get(`/User/users`, {
            params: {
                Name,
                SortBy,
                isDecsending,
                PageNumber,
                PageSize,
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const GetUserById = async (id) => {
    try {
        const res = await request.get(`/User/${id}`, {
            params: {
                id,
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const UpdateUserById = async (id, data) => {
    try {
        const res = await request.put(`/User/${id}`, data);
        return res;
    } catch (error) {
        throw error;
    }
};

export const DeleteUserById = async (id) => {
    try {
        const res = await request.delete(`/User/${id}`, {
            params: {
                id,
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const GetProfile = async () => {
    try {
        const res = await request.get(`/user/profile`);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const ChangePassword = async (id, data) => {
    const res = await request.patch(`/User/${id}`, data);
    return res.data;
};

export const GetProvinces = async () => {
    const res = await request.get(`http://localhost:5299/provinces`);
    return res.data;
};

export const GetDistricts = async (parentCode) => {
    const res = await request.get(`http://localhost:5299/district/${parentCode}`);
    return res.data;
};

export const GetWards = async (parentCode) => {
    const res = await request.get(`http://localhost:5299/ward/${parentCode}`);
    return res.data;
};

export const UpdateAddress = async (data) => {
    try {
        const res = await request.post(`/Address`, data);
        return res;
    } catch (error) {
        throw error;
    }
};

export const GetTotalRevenue = async () => {
    try {
        const res = await request.get(`/Order/admin/total-revenue`);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const GetProductSales = async () => {
    try {
        const res = await request.get(`/Order/admin/product-sales`);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const GetRevenueProducts = async () => {
    try {
        const res = await request.get(`/Order/admin/revenue-by-product`);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const GetOrderByDate = async (startDate, endDate) => {
    try {
        const res = await request.get(`/Order/admin/orders-by-date`, {
            params: {
                startDate,
                endDate,
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};
