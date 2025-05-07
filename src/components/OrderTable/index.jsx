import React from 'react';
import HeaderTable from '~/components/HeaderTabel';
import { getOrderStatusStyle, getOrderStatusText } from '~/components/BodyTabel/Constant';
import { listTitleOrder } from '~/pages/User/BoardOrder/Constant';

const OrderTable = ({ orderList, onToggleExpand }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 border border-gray-300 rounded-md">
            <HeaderTable listTitle={listTitleOrder} />
            <tbody>
                {Array.isArray(orderList) && orderList.length > 0 ? (
                    orderList.map((order) => (
                        <tr
                            key={order.id}
                            className="cursor-pointer hover:bg-gray-50"
                            onClick={() => onToggleExpand(order.id)}
                        >
                            <td className="px-4 py-3">{order.name}</td>
                            <td className="px-4 py-3">{`${order.user?.lastName} ${order.user?.firstName}`}</td>
                            <td className="px-4 py-3">{order.user?.phone}</td>
                            <td className="px-4 py-3 text-center">{order.countProduct}</td>
                            <td className="px-4 py-3 text-center">{order.total.toLocaleString()}đ</td>
                            <td className="px-4 py-3">{new Date(order.createOrder).toLocaleString()}</td>
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
);

export default OrderTable;
