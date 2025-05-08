import HeaderTable from '~/components/HeaderTabel';
import { listTitle } from './Constant';
import BodyTabel from '~/components/BodyTabel';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import { GetOrderProductAdmin, RemoveOrder } from '~/services/Order';
import { useStorage } from '~/Contexts';

function BoardCancelOrder() {
    const { userData } = useStorage();
    const [orderList, setOrderList] = useState([]);
    const [status, setStatus] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (userData && userData.id) {
            const getData = async () => {
                const res = await GetOrderProductAdmin({ userId: userData?.id, Status: 4 });
                setOrderList(res);
            };
            getData();
        }
    }, [status, userData]);

    const editOrder = (data) => {
        const url = routes.adminUpdateOrder.replace(':id', data.id);
        navigate(`${url}?userId=${data?.user.id}`);
    };
    const deleteOrder = async (data) => {
        await RemoveOrder({ userId: data.user.id, orderId: data.id });
        setStatus(!status);
    };
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full text-left text-sm">
                <HeaderTable listTitle={listTitle} />
                <tbody>
                    {orderList.length > 0 &&
                        orderList.map((order, index) => (
                            <BodyTabel
                                key={order.id}
                                index={index}
                                item={order}
                                onDel={deleteOrder}
                                onEdit={editOrder}
                            />
                        ))}
                </tbody>
            </table>
            {orderList.length === 0 && <div className="text-center py-6 text-gray-500">Không có đơn hàng nào</div>}
        </div>
    );
}

export default BoardCancelOrder;
