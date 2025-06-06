import { useQuery } from '@tanstack/react-query';
import { EQueryKeys } from '~/constants';
import { GetUsers } from '~/services/User';

const useGetUsers = (params) => {
    return useQuery({
        queryKey: [EQueryKeys.GET_LIST_USER, params],
        queryFn: async () => {
            const res = await GetUsers(params);
            return res;
        },
        enabled: !!params,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
    });
};

export default useGetUsers;
