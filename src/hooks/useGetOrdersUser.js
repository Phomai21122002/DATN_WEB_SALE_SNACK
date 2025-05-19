import { useQuery } from '@tanstack/react-query';
import { EQueryKeys } from '~/constants';
import { GetOrdersProduct } from '~/services/Order';

const useGetOrdersUser = (queryInput) => {
    const {
        data,
        isLoading: isLoadingListOrderUser,
        isFetching,
        isError,
        refetch: refetchListOrderUser,
        fetchNextPage,
        hasNextPage,
    } = useQuery({
        queryKey: [EQueryKeys.GET_LIST_ORDER_USER, queryInput],
        queryFn: async () => {
            const response = await GetOrdersProduct(queryInput);
            return response;
        },
        enabled: !!queryInput.userId && !!queryInput.Status,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
    });

    return {
        data,
        isLoadingListOrderUser,
        isFetching,
        isError,
        refetchListOrderUser,
        fetchNextPage,
        hasNextPage,
    };
};

export default useGetOrdersUser;
