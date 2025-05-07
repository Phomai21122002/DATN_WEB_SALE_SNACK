import { useEffect, useMemo, useState } from 'react';
import { GetOrderById, GetOrdersProduct } from '~/services/Order';
import BackgroundCart from '~/components/BackgroundCart';
import HeaderTable from '~/components/HeaderTabel';
import { useStorage } from '~/Contexts';
import { getOrderStatusStyle, getOrderStatusText } from '~/components/BodyTabel/Constant';
import { listTitleOrder, orderTabs } from './Constant';
import Purchase from '~/components/Purchase';

function BoardOrder() {
    const { userData } = useStorage();
    const [orderList, setOrderList] = useState([]);
    const [expandedOrderId, setExpandedOrderId] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(0);

    const { totalOrderPrice, totalProductCount, finalTotal, totalShipping } = useMemo(() => {
        const shippingFee = 30000;
        const totalShipping = shippingFee * orderList.length;
        const totalOrderPrice = orderList?.reduce((sum, o) => sum + o.total, 0) || 0;
        const totalProductCount = orderList?.reduce((sum, o) => sum + o.countProduct, 0) || 0;
        const finalTotal = totalOrderPrice + totalShipping;
        return { totalOrderPrice, totalProductCount, finalTotal, totalShipping };
    }, [orderList]);

    useEffect(() => {
        const getData = async () => {
            if (Object.keys(userData).length > 0) {
                const res = await GetOrdersProduct(userData?.id, selectedStatus);
                setOrderList(res);
            }
        };
        getData();
    }, [userData, selectedStatus]);

    const toggleExpand = async (orderId) => {
        if (expandedOrderId === orderId) {
            setExpandedOrderId(null);
            setSelectedOrder(null);
        } else {
            setExpandedOrderId(orderId);
            const res = await GetOrderById(orderId, userData.id);
            console.log(res);
            setSelectedOrder(res);
        }
    };

    const handleTabClick = async (status) => {
        setSelectedStatus(status);
        setExpandedOrderId(null);
        setSelectedOrder(null);
    };

    return (
        <div className="flex justify-center mt-24 pb-8 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="max-w-[1100px] mx-auto py-8 w-full">
                <ul className="flex items-center mb-6 bg-gray-100">
                    {orderTabs.map((tab) => (
                        <li
                            key={tab.value}
                            onClick={() => handleTabClick(tab.value)}
                            className={`flex-1 text-center cursor-pointer px-8 py-4 text-lg font-medium transition ${
                                selectedStatus === tab.value
                                    ? 'bg-yellow-200 text-black'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {tab.label}
                        </li>
                    ))}
                </ul>
                <div>
                    <h2 className="text-xl font-semibold mb-6">Danh sách đơn hàng</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-700 border border-gray-300 rounded-md">
                            <HeaderTable listTitle={listTitleOrder} />

                            <tbody>
                                {Array.isArray(orderList) && orderList.length > 0 ? (
                                    orderList.map((order) => (
                                        <tr
                                            key={order.id}
                                            className="cursor-pointer hover:bg-gray-50"
                                            onClick={() => toggleExpand(order.id)}
                                        >
                                            <td className="px-4 py-3">{order.name}</td>
                                            <td className="px-4 py-3">{`${order.user?.lastName} ${order.user?.firstName}`}</td>
                                            <td className="px-4 py-3">{order.user?.phone}</td>
                                            <td className="px-4 py-3 text-center">{order.countProduct}</td>
                                            <td className="px-4 py-3 text-center">{order.total.toLocaleString()}đ</td>
                                            <td className="px-4 py-3">
                                                {new Date(order.createOrder).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getOrderStatusStyle(
                                                        order.status,
                                                    )}`}
                                                >
                                                    {getOrderStatusText(order.status)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-6 text-gray-500">
                                            Chưa có đơn hàng
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {expandedOrderId && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3">Chi tiết đơn hàng</h3>
                        <div className="w-full flex bg-white py-2 mb-4 font-semibold text-gray-600 shadow-sm">
                            <Purchase
                                products={selectedOrder?.products || []}
                                date={selectedOrder?.createOrder || ''}
                            />
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

export default BoardOrder;
