import { useQuery } from '@tanstack/react-query';
import { EQueryKeys } from '~/constants';
import { GetOrderProductAdmin } from '~/services/Order';

const useGetProductsInOrderInAdmin = (params) => {
    return useQuery({
        queryKey: [EQueryKeys.GET_LIST_ORDER_PRODUCT_ADMIN, params],
        queryFn: async () => {
            const res = await GetOrderProductAdmin(params);
            return res;
        },
        enabled: !!params,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
    });
};

export default useGetProductsInOrderInAdmin;
