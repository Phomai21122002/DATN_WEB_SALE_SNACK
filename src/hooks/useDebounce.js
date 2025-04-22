import { useEffect, useState } from 'react';
import { GetCart } from '~/services/Cart';
import { useQuery } from '@tanstack/react-query';
import { EQueryKeys } from '~/constants';

function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebounceValue(value), delay);

        return () => {
            clearTimeout(handler);
        };
        // eslint-disable-next-line
    }, [value]);

    return debounceValue;
}

export const useGetCart = (PageNumber, PageSize) => {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: [EQueryKeys.GET_CART],
        queryFn: () => GetCart(PageNumber, PageSize),
        ...{
            refetchOnWindowFocus: false,
        },
    });

    return { data: data?.data, isLoading, isError, refetch };
};

export default useDebounce;
