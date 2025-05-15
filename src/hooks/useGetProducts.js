import { useQuery } from '@tanstack/react-query';
import { EQueryKeys } from '~/constants';
import { GetProducts } from '~/services/Product';

const useGetProducts = (filters) => {
    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch: refetchListProduct,
        fetchNextPage,
        hasNextPage,
    } = useQuery({
        queryKey: [EQueryKeys.GET_LIST_PRODUCT, filters],
        queryFn: async () => {
            const response = await GetProducts(filters);
            return response;
        },
        enabled: !!filters,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
    });

    return {
        data,
        isLoading,
        isFetching,
        isError,
        refetchListProduct,
        fetchNextPage,
        hasNextPage,
    };
};

export default useGetProducts;
