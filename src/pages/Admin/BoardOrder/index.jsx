import HeaderTable from '~/components/HeaderTabel';
import { listTitle } from './Constant';
import BodyTabel from '~/components/BodyTabel';
import { useEffect, useState } from 'react';
import { GetOrderProductAdmin, RemoveSoftOrder } from '~/services/Order';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import { useStorage } from '~/Contexts';

function BoardOrder() {
    const { userData } = useStorage();
    const [orderList, setOrderList] = useState([]);
    const [status, setStatus] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        console.log(userData);
        if (userData && userData.id) {
            const getData = async () => {
                const res = await GetOrderProductAdmin({ userId: userData.id, Status: 1 });
                setOrderList(res);
            };
            getData();
        }
    }, [status, userData]);

    const editOrder = (id) => {
        navigate(routes.adminUpdateOrder.replace(':id', id));
    };
    const deleteOrder = async (orderId) => {
        await RemoveSoftOrder({ userId: userData.id, orderId });
        setStatus(!status);
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
