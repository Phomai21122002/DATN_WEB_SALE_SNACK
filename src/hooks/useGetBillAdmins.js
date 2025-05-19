import { useQuery } from '@tanstack/react-query';
import { EQueryKeys } from '~/constants';
import { GetBillsAdmin } from '~/services/Bill';

const useGetBillAdmins = (queryInput) => {
    const { data, isLoading, isFetching, isError, refetch, fetchNextPage, hasNextPage } = useQuery({
        queryKey: [EQueryKeys.GET_LIST_BILL_ADMIN, queryInput],
        queryFn: async () => {
            const response = await GetBillsAdmin(queryInput);
            return response;
        },
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

export default useGetBillAdmins;
