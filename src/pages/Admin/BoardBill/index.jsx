import HeaderTable from '~/components/HeaderTabel';
import { listTitle } from './Constant';
import BodyTabel from '~/components/BodyTabel';
import { GetOrderProductAdmin, UpdateOrderProduct } from '~/services/Order';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';

function BoardBill() {
    const [orderList, setOrderList] = useState([]);
    const [statusPending, setStatusPending] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const getData = async () => {
            const res = await GetOrderProductAdmin({ Status: 2 });
            setOrderList(res.orders);
        };
        getData();
    }, [statusPending]);

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
                    {orderList.map((order, index) => (
                        <BodyTabel
                            key={order.id}
                            index={index}
                            item={order}
                            status
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

export default BoardBill;
