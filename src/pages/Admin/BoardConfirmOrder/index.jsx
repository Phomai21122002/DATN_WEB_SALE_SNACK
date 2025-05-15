import HeaderTable from '~/components/HeaderTabel';
import { listTitle } from './Constant';
import BodyTabel from '~/components/BodyTabel';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import { RemoveSoftOrder } from '~/services/Order';
import { useStorage } from '~/Contexts';
import useGetProductsInOrderInAdmin from '~/hooks/useGetProductsInOrderInAdmin';
import Pagination from '~/components/Pagination';
import SkeletonRow from '~/components/SkeletonRow';
import PopUpRemove from '~/components/PopUpRemove';

function BoardConfirmOrder() {
    const { userData } = useStorage();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [orderList, setOrderList] = useState([]);
    const [chooseRemove, setChooseRemove] = useState({});

    const params = useMemo(() => {
        if (!userData?.id) return null;
        return { userId: userData.id, Status: 2, PageNumber: page };
    }, [userData, page]);
    const { data, isLoading, refetch } = useGetProductsInOrderInAdmin(params);

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
        try {
            await RemoveSoftOrder({ userId: data?.user.id, orderId: data.id });
            await refetch();
            setChooseRemove({});
        } catch (error) {
            console.log(error);
        }
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
                                onDel={setChooseRemove}
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
            {chooseRemove && (
                <PopUpRemove
                    id={chooseRemove.id}
                    title={'Xóa đơn đặt hàng'}
                    desc={`Bạn có chắc chắn muốn xóa đơn hàng ${chooseRemove?.name} của khách hàng ${chooseRemove?.user?.firstName} không?`}
                    onRemove={() => deleteOrder(chooseRemove)}
                    onClose={() => setChooseRemove({})}
                    isRemove={Object.keys(chooseRemove).length > 0}
                />
            )}
        </div>
    );
}

export default BoardConfirmOrder;
