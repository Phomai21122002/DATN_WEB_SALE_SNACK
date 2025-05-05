import HeaderTable from '~/components/HeaderTabel';
import { listTitleUser } from './Constant';
import BodyTabel from '~/components/BodyTabel';
import { useEffect, useState } from 'react';
import { GetOrdersProduct } from '~/services/Order';
import { useStorage } from '~/Contexts';

function BoardBill() {
    const { userData } = useStorage();
    const [orderList, setOrderList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await GetOrdersProduct(userData.id, 3);
                setOrderList(res || []);
            } catch (error) {
                console.error('Lỗi khi lấy đơn hàng:', error);
                setOrderList([]);
            } finally {
                setLoading(false);
            }
        };
        if (userData?.id) {
            getData();
        }
    }, [userData]);

    const editOrder = (id) => {
        console.log('Editing order', id);
    };

    const deleteOrder = (id) => {
        console.log('Deleting order', id);
    };

    return (
        <div className="flex flex-col items-center mt-24 pb-8 bg-white shadow-md rounded-lg overflow-hidden px-4">
            <div className="overflow-x-auto w-full">
                <table className="min-w-[1000px] text-left text-sm w-full">
                    <HeaderTable listTitle={listTitleUser} />
                    <tbody>
                        {orderList.map((order, index) => (
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
                {!loading && orderList.length === 0 && (
                    <div className="text-center py-6 text-gray-500 w-full">Không có đơn hàng nào</div>
                )}
                {loading && <div className="text-center py-6 text-blue-500 w-full">Đang tải đơn hàng...</div>}
            </div>
        </div>
    );
}

export default BoardBill;
