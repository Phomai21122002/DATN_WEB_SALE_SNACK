import { useQuery } from '@tanstack/react-query';
import { EQueryKeys } from '~/constants';
import { GetProductsByIdCategory } from '~/services/Product';

const useGetProductsByIdCategory = (filters) => {
    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch: refetchListProduct,
        fetchNextPage,
        hasNextPage,
    } = useQuery({
        queryKey: [EQueryKeys.GET_LIST_PRODUCT_BY_IDCATEGORY, filters],
        queryFn: async () => {
            console.log(filters);
            const response = await GetProductsByIdCategory(filters);
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

export default useGetProductsByIdCategory;
