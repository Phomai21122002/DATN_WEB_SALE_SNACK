import { useQuery } from '@tanstack/react-query';
import { EQueryKeys } from '~/constants';
import { GetFeedBacks } from '~/services/Feedback';

const useGetFeedBacks = (params) => {
    const {
        data,
        isLoading: isLoadingListFeedback,
        isFetching,
        isError,
        refetch: refetchListFeedback,
        fetchNextPage,
        hasNextPage,
    } = useQuery({
        queryKey: [EQueryKeys.GET_LIST_FEEDBACK, { ...params }],
        queryFn: async () => {
            const response = await GetFeedBacks(params);
            console.log(response);
            return response;
        },
        refetchOnWindowFocus: false,
        enabled: !!params.userId && !!params.productId,
        keepPreviousData: true,
    });

    return {
        data,
        isLoadingListFeedback,
        isFetching,
        isError,
        refetchListFeedback,
        fetchNextPage,
        hasNextPage,
    };
};

export default useGetFeedBacks;
