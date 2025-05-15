import HeaderTable from '~/components/HeaderTabel';
import { listTitle } from './Constant';
import BodyTabel from '~/components/BodyTabel';
import { useEffect, useMemo, useState } from 'react';
import { RemoveSoftOrder } from '~/services/Order';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import { useStorage } from '~/Contexts';
import useGetProductsInOrderInAdmin from '~/hooks/useGetProductsInOrderInAdmin';
import Pagination from '~/components/Pagination';
import SkeletonRow from '~/components/SkeletonRow';

function BoardOrder() {
    const navigate = useNavigate();
    const { userData } = useStorage();
    const [page, setPage] = useState(1);
    const [orderList, setOrderList] = useState([]);
    const [status, setStatus] = useState(false);

    const params = useMemo(() => {
        if (!userData?.id) return null;
        return { userId: userData.id, Status: 1, PageNumber: page };
    }, [userData, page]);
    const { data, isLoading } = useGetProductsInOrderInAdmin(params);

    const totalPages = useMemo(() => {
        const totalCount = data?.totalCount || 0;
        return totalCount ? Math.ceil(totalCount / data?.pageSize) : 0;
    }, [data]);

    useEffect(() => {
        setOrderList(data?.datas || []);
    }, [data]);

    const editOrder = (data) => {
        const url = routes.adminUpdateOrder.replace(':id', data.id);
        navigate(`${url}?userId=${data?.user.id}`);
    };
    const deleteOrder = async (data) => {
        await RemoveSoftOrder({ userId: data?.user.id, orderId: data.id });
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

export default BoardOrder;
