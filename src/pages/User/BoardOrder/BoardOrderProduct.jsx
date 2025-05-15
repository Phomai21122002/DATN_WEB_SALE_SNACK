import { useStorage } from '~/Contexts';
import useGetProductsInOrder from '~/hooks/useGetProductsInOrder';
import Purchase from '~/components/Purchase';
import PurchaseSkeleton from '~/components/SkeletonPurChase';

const PageSize = 5;
function BoardOrderProduct({ selectedStatus }) {
    const { userData } = useStorage();

    const { allProducts, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetProductsInOrder({
        userId: userData?.id,
        Status: selectedStatus,
        PageSize: PageSize,
    });

    return (
        <div className="flex flex-col justify-center overflow-hidden">
            {isLoading
                ? Array.from({ length: PageSize }).map((_, i) => <PurchaseSkeleton key={i} />)
                : allProducts.map((product, index) => (
                      <Purchase key={index} product={product} date={product?.createOrder || ''} />
                  ))}

            {hasNextPage && (
                <button
                    onClick={() => fetchNextPage()}
                    className="mt-4 self-center text-xl px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                    disabled={isFetchingNextPage}
                >
                    {isFetchingNextPage ? 'Đang tải...' : 'Xem thêm'}
                </button>
            )}
        </div>
    );
}

export default BoardOrderProduct;
