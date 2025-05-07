import BackgroundCart from '~/components/BackgroundCart';
import Purchase from '~/components/Purchase';
import OrderTable from '~/components/OrderTable';

function BoardOrderConfirm({ orderList, selectedOrder, expandedOrderId, toggleExpand }) {
    const shippingFee = 30000;

    const totalShipping = shippingFee * orderList.length;
    const totalOrderPrice = orderList?.reduce((sum, o) => sum + o.total, 0) || 0;
    const totalProductCount = orderList?.reduce((sum, o) => sum + o.countProduct, 0) || 0;
    const finalTotal = totalOrderPrice + totalShipping;

    return (
        <div className="flex justify-center pb-8 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="max-w-[1100px] mx-auto py-8 w-full">
                <div>
                    <h2 className="text-xl mx-4 font-semibold mb-6">Danh sách đơn hàng</h2>
                    <OrderTable orderList={orderList} onToggleExpand={toggleExpand} />
                </div>

                {expandedOrderId && selectedOrder && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3">Chi tiết đơn hàng</h3>
                        <div className="w-full flex flex-col bg-white py-2 mb-4 font-semibold text-gray-600 shadow-sm">
                            {selectedOrder?.products.map((product, index) => (
                                <Purchase key={index} product={product} date={selectedOrder?.createOrder || ''} />
                            ))}
                        </div>

                        <BackgroundCart className="flex flex-col w-full items-end mb-12 mt-4">
                            <div className="text-base font-medium w-full max-w-md">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-700">
                                        Tổng tiền hàng ({selectedOrder?.countProduct} sản phẩm):
                                    </span>
                                    <span className="text-red-500 font-semibold">
                                        {selectedOrder?.total.toLocaleString()}đ
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

export default BoardOrderConfirm;
