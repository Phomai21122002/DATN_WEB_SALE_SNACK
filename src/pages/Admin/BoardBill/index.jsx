import HeaderTable from '~/components/HeaderTabel';
import { listTitle } from './Constant';
import BodyTabel from '~/components/BodyTabel';
import { GetOrderProductAdmin, RemoveSoftOrder } from '~/services/Order';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import { useStorage } from '~/Contexts';
import Pagination from '~/components/Pagination';
import useGetProductsInOrderInAdmin from '~/hooks/useGetProductsInOrderInAdmin';
import SkeletonRow from '~/components/SkeletonRow';

function BoardBill() {
    const { userData } = useStorage();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [orderList, setOrderList] = useState([]);
    const [status, setStatus] = useState(false);
    const params = useMemo(() => {
        if (!userData?.id) return null;
        return { userId: userData.id, Status: 3, PageNumber: page };
    }, [userData, page]);
    const { data, isLoading } = useGetProductsInOrderInAdmin(params);

    const totalPages = useMemo(() => {
        const totalCount = data?.totalCount || 0;
        return totalCount ? Math.ceil(totalCount / data?.pageSize) : 0;
    }, [data]);

    useEffect(() => {
        setOrderList(data?.datas || []);
    }, [data]);

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
                    {isLoading ? (
                        Array.from({ length: 10 }).map((_, idx) => <SkeletonRow key={idx} col={listTitle.length} />)
                    ) : orderList.length > 0 ? (
                        orderList.map((order, index) => (
                            <BodyTabel
                                key={order.id}
                                index={index}
                                item={order}
                                status
                                onDel={deleteOrder}
                                onEdit={editOrder}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={listTitle.length} className="text-center py-6 text-gray-500">
                                Không có đơn hàng nào
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination className={'m-8 justify-end'} page={page} setPage={setPage} totalPages={totalPages} />
        </div>
    );
}

export default BoardBill;
