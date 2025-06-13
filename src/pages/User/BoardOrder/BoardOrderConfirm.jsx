import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import BackgroundCart from '~/components/BackgroundCart';
import Purchase from '~/components/Purchase';
import OrderTable from '~/components/OrderTable';
import Pagination from '~/components/Pagination';
import useGetOrdersUser from '~/hooks/useGetOrdersUser';
import { useStorage } from '~/Contexts';
import { GetOrderById } from '~/services/Order';

const SHIPPING_FEE = 30000;

function BoardOrderConfirm({ selectedOrder, setSelectedOrder, selectedStatus }) {
    const [page, setPage] = useState(1);
    const [orderList, setOrderList] = useState([]);
    const [expandedOrderId, setExpandedOrderId] = useState('');
    const { userData } = useStorage();

    const { data, isLoadingListOrderUser, refetchListOrderUser } = useGetOrdersUser({
        userId: userData?.id,
        Status: selectedStatus,
        PageNumber: page,
    });

    useEffect(() => {
        setOrderList(data?.datas ?? []);
    }, [data]);

    const totalPages = useMemo(() => {
        const totalCount = data?.totalCount || 0;
        return totalCount ? Math.ceil(totalCount / data?.pageSize) : 0;
    }, [data]);

    const { totalOrderPrice, totalShipping, totalProductCount, finalTotal } = useMemo(() => {
        const orderPrice = orderList.reduce((sum, o) => sum + o.total, 0);
        const productCount = orderList.reduce((sum, o) => sum + o.countProduct, 0);
        const shipping = SHIPPING_FEE * orderList.length;
        return {
            totalOrderPrice: orderPrice,
            totalShipping: shipping,
            totalProductCount: productCount,
            finalTotal: orderPrice + shipping,
        };
    }, [orderList]);

    const handleToggleExpand = useCallback(
        async (orderId) => {
            if (expandedOrderId === orderId) {
                setExpandedOrderId('');
                setSelectedOrder(null);
                return;
            }
            try {
                const res = await GetOrderById(orderId, userData?.id);
                setExpandedOrderId(orderId);
                setSelectedOrder(res);
            } catch (error) {
                console.error('Failed to fetch order details:', error);
            }
        },
        [expandedOrderId, userData?.id, setSelectedOrder],
    );

    return (
        <div className="flex justify-center pb-8 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="max-w-[1100px] mx-auto py-8 w-full">
                <h2 className="text-xl mx-4 font-semibold mb-6">Danh sách đơn hàng</h2>
                <OrderTable
                    isLoading={isLoadingListOrderUser}
                    orderList={orderList}
                    onToggleExpand={handleToggleExpand}
                    expandedOrderId={expandedOrderId}
                />
                <Pagination page={page} setPage={setPage} totalPages={totalPages} />
                {expandedOrderId && selectedOrder && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3 mx-4">Chi tiết đơn hàng</h3>
                        <div className="w-full flex flex-col bg-white py-2 mb-4 font-semibold text-gray-600 shadow-sm">
                            {selectedOrder.products.map((product, index) => (
                                <Purchase
                                    key={index}
                                    product={{ product: product, id: selectedOrder.id, name: selectedOrder.name }}
                                    refetch={refetchListOrderUser}
                                    date={selectedOrder.createOrder || ''}
                                />
                            ))}
                        </div>

                        <BackgroundCart className="flex flex-col w-full items-end mb-12 mt-4">
                            <div className="text-base font-medium w-full max-w-md">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-700">
                                        Tổng tiền hàng ({selectedOrder.countProduct} sản phẩm):
                                    </span>
                                    <span className="text-red-500 font-semibold">
                                        {selectedOrder.total.toLocaleString()}đ
                                    </span>
                                </div>
                            </div>
                        </BackgroundCart>
                    </div>
                )}

                <BackgroundCart className="flex flex-col w-full items-end mt-8 mb-12">
                    <div className="text-[16px] font-medium w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-700">Tổng tiền hàng ({totalProductCount} sản phẩm):</span>
                            <span className="text-black-500 font-semibold">{totalOrderPrice.toLocaleString()}đ</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-700">Phí vận chuyển:</span>
                            <span className="text-black-500 font-semibold">{totalShipping.toLocaleString()}đ</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-700">Tổng thành tiền:</span>
                            <span className="text-red-500 font-semibold">{finalTotal.toLocaleString()}đ</span>
                        </div>
                    </div>
                </BackgroundCart>
            </div>
        </div>
    );
}

export default memo(BoardOrderConfirm);
