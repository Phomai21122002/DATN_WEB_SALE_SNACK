import { useQuery } from '@tanstack/react-query';
import { EQueryKeys } from '~/constants';
import { GetAddressesByUserId } from '~/services/User';

const useGetAddresses = (userId) => {
    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch: refetchAddress,
    } = useQuery({
        queryKey: [EQueryKeys.GET_LIST_ADDRESS_USER, userId],
        queryFn: async () => {
            const response = await GetAddressesByUserId({ inputUserId: userId });
            return response;
        },
        enabled: !!userId,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
    });

    return {
        data,
        isLoading,
        isFetching,
        isError,
        refetchAddress,
    };
};

export default useGetAddresses;
