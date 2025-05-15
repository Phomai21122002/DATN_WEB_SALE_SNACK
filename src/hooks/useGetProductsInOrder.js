import { useInfiniteQuery } from '@tanstack/react-query';
import { EQueryKeys } from '~/constants';
import { GetOrderProductInOrder } from '~/services/Order';

const useGetProductsInOrder = ({ userId, Status, PageSize }) => {
    const queryResult = useInfiniteQuery({
        queryKey: [EQueryKeys.GET_LIST_ORDER_PRODUCT_USER, userId, Status],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await GetOrderProductInOrder({
                userId,
                Status,
                PageNumber: pageParam,
                PageSize,
            });
            console.log(res);
            return res;
        },
        getNextPageParam: (lastPage, pages) => {
            const totalPages = Math.ceil(lastPage.totalCount / lastPage.pageSize);
            const nextPage = pages.length + 1;
            return nextPage <= totalPages ? nextPage : undefined;
        },
        enabled: !!userId && Status !== undefined,
    });

    const allProducts = queryResult.data?.pages.flatMap((page) => page.datas) || [];

    return {
        ...queryResult,
        allProducts,
    };
};

export default useGetProductsInOrder;
