import { useQuery } from '@tanstack/react-query';
import { EQueryKeys } from '~/constants';
import { GetCategories } from '~/services/Category';

const useGetCategories = () => {
    const {
        data,
        isLoading: isLoadingListCategory,
        isFetching,
        isError,
        refetch: refetchListCategory,
        fetchNextPage,
        hasNextPage,
    } = useQuery({
        queryKey: [EQueryKeys.GET_LIST_CATEGORY],
        queryFn: async () => {
            const response = await GetCategories();
            console.log(response);
            return response;
        },
        refetchOnWindowFocus: false,
        keepPreviousData: true,
    });

    return {
        data: data,
        isLoadingListCategory,
        isFetching,
        isError,
        refetchListCategory,
        fetchNextPage,
        hasNextPage,
    };
};

export default useGetCategories;
