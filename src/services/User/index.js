import request from '../request';

export const GetUsers = async ({ Name, SortBy, isDecsending = false, PageNumber = 1, PageSize = 10 } = {}) => {
    try {
        const res = await request.get(`/user/users`, {
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
        const res = await request.get(`/user/user`, {
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
        const res = await request.put(`/user/profile`, data, {
            params: {
                userId: id,
            },
        });
        return res;
    } catch (error) {
        throw error;
    }
};

export const UpdateUserOfAdmin = async (id, data) => {
    try {
        const res = await request.put(`/user/user`, data, {
            params: {
                userId: id,
            },
        });
        return res;
    } catch (error) {
        throw error;
    }
};

export const DeleteUserById = async (id) => {
    try {
        const res = await request.delete(`/user`, {
            params: {
                userId: id,
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

export const ChangePassword = async (userId, data) => {
    const res = await request.patch(`/user/change-password`, data, {
        params: {
            userId: userId,
        },
    });
    return res.data;
};

export const ResetPassword = async (data) => {
    const res = await request.patch(`/user/forgot-password`, data);
    return res.data;
};

export const GetProvinces = async (inputUserId) => {
    const res = await request.get(`/address/provinces`, {
        params: {
            inputUserId: inputUserId,
        },
    });
    return res.data;
};

export const GetDistricts = async (inputUserId, parentCode) => {
    const res = await request.get(`/address/districts`, {
        params: {
            inputUserId: inputUserId,
            codeParent: parentCode,
        },
    });
    return res.data;
};

export const GetWards = async (inputUserId, parentCode) => {
    const res = await request.get(`/address/wards`, {
        params: {
            inputUserId: inputUserId,
            codeParent: parentCode,
        },
    });
    return res.data;
};

export const AddAddressByUserId = async ({ inputUserId, name, code }) => {
    const res = await request.post(
        `/address`,
        {
            name: name,
            code: code,
        },
        {
            params: {
                inputUserId: inputUserId,
            },
        },
    );
    return res.data;
};

export const DeleteAddress = async ({ inputUserId, addressId }) => {
    const res = await request.delete(`/address`, {
        params: {
            inputUserId: inputUserId,
            addressId: addressId,
        },
    });
    return res.data;
};

export const GetAddressesByUserId = async ({ inputUserId }) => {
    const res = await request.get(`/address/addresses`, {
        params: {
            inputUserId: inputUserId,
        },
    });
    return res.data;
};

export const UpdateAddressByUserId = async ({ inputUserId, addressId }) => {
    const res = await request.put(`/address`, null, {
        params: {
            inputUserId: inputUserId,
            addressId: addressId,
        },
    });
    return res.data;
};

export const GetTotalRevenue = async () => {
    const res = await request.get(`/Order/admin/total-revenue`);
    return res.data;
};

export const GetProductSales = async () => {
    const res = await request.get(`/Order/admin/product-sales`);
    return res.data;
};

export const GetRevenueProducts = async () => {
    const res = await request.get(`/Order/admin/revenue-by-product`);
    return res.data;
};

export const GetOrderByDate = async (startDate, endDate) => {
    const res = await request.get(`/Order/admin/orders-by-date`, {
        params: {
            startDate,
            endDate,
        },
    });
    return res.data;
};
