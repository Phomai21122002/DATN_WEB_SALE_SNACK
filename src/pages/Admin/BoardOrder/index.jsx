import HeaderTable from '~/components/HeaderTabel';
import { listTitle } from './Constant';
import BodyTabel from '~/components/BodyTabel';
import { useEffect, useState } from 'react';
import { GetOrderProductAdmin, UpdateOrderProduct } from '~/services/Order';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import { useStorage } from '~/Contexts';

function BoardOrder() {
    const { userData } = useStorage();
    const [orderList, setOrderList] = useState([]);
    const [statusPending, setStatusPending] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const getData = async () => {
            if (userData && userData.id) {
                const res = await GetOrderProductAdmin({ userId: userData.id, Status: 0 });
                setOrderList(res.orders);
            }
        };

        getData();
    }, [statusPending, userData]);

    const editOrder = (id, userId) => {
        navigate(`${routes.adminUpdateOrder}?id=${id}&userId=${userId}`);
    };
    const deleteOrder = async (orderId, userId) => {
        const data = {
            userId: userId,
            status: 3,
        };
        await UpdateOrderProduct(orderId, data);
        setStatusPending(!statusPending);
    };
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full text-left text-sm">
                <HeaderTable listTitle={listTitle} />
                <tbody>
                    {Array.isArray(orderList) && orderList.length > 0 ? (
                        orderList.map((order, index) => (
                            <BodyTabel
                                key={order.id}
                                index={index}
                                item={order}
                                onDel={deleteOrder}
                                onEdit={editOrder}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center py-6 text-gray-500">
                                Không có đơn hàng nào
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default BoardOrder;
