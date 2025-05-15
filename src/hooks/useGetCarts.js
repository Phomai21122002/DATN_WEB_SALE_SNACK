import { useQuery } from '@tanstack/react-query';
import { EQueryKeys } from '~/constants';
import { GetCarts } from '~/services/Cart';

const useGetCarts = (userId) => {
    const {
        data,
        isLoading: isLoadingListCart,
        isFetching,
        isError,
        refetch: refetchListCart,
    } = useQuery({
        queryKey: [EQueryKeys.GET_LIST_CART, userId],
        queryFn: async () => {
            const response = await GetCarts(userId);
            return response;
        },
        enabled: !!userId,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
    });

    return {
        data: data,
        isLoadingListCart,
        isFetching,
        isError,
        refetchListCart,
    };
};

export default useGetCarts;
