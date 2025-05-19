import { useQuery } from '@tanstack/react-query';
import { EQueryKeys } from '~/constants';
import { GetBills } from '~/services/Bill';

const useGetBills = (queryInput) => {
    const { data, isLoading, isFetching, isError, refetch, fetchNextPage, hasNextPage } = useQuery({
        queryKey: [EQueryKeys.GET_LIST_BILL, queryInput],
        queryFn: async () => {
            const response = await GetBills(queryInput);
            return response;
        },
        enabled: !!queryInput.userId,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
    });

    return {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
        fetchNextPage,
        hasNextPage,
    };
};

export default useGetBills;
