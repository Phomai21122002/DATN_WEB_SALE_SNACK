import { useQuery } from '@tanstack/react-query';
import { EQueryKeys } from '~/constants';
import { GetProfile } from '~/services/User';

const useGetProfile = (options = {}) => {
    const {
        data,
        isLoading: isLoadingProfile,
        isFetching,
        isError,
        isSuccess,
        refetch: refetchProfile,
    } = useQuery({
        queryKey: [EQueryKeys.GET_PROFILE],
        queryFn: async () => {
            const response = await GetProfile();
            return response;
        },
        ...options,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
    });

    return {
        data: data,
        isLoadingProfile,
        isFetching,
        isError,
        isSuccess,
        refetchProfile,
    };
};

export default useGetProfile;
