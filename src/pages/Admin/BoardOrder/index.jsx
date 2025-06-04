import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HeaderTable from '~/components/HeaderTabel';
import { dataChart, listTitle, options, stats } from './Constant';
import BodyTabel from '~/components/BodyTabel';
import { GetOrderStatistic, RemoveSoftOrder } from '~/services/Order';
import routes from '~/config/routes';
import { useStorage } from '~/Contexts';
import useGetProductsInOrderInAdmin from '~/hooks/useGetProductsInOrderInAdmin';
import Pagination from '~/components/Pagination';
import SkeletonRow from '~/components/SkeletonRow';
import PopUpRemove from '~/components/PopUpRemove';
import StatCardProduct from '~/components/StatCardProduct';
import StatCardRenevue from '~/components/StatCardRenevue';
import StatCardDashBoard from '~/components/StatCardDashBoard';

function BoardOrder() {
    const navigate = useNavigate();
    const { userData } = useStorage();
    const [page, setPage] = useState(1);
    const [orderList, setOrderList] = useState([]);
    const [orderListStatistic, setOrderListStatistic] = useState({});
    const [chooseRemove, setChooseRemove] = useState({});

    const params = useMemo(() => {
        if (!userData?.id) return null;
        return { userId: userData.id, Status: 1, PageNumber: page };
    }, [userData, page]);
    const { data, isLoading, refetch } = useGetProductsInOrderInAdmin(params);

    const totalPages = useMemo(() => {
        const totalCount = data?.totalCount || 0;
        return totalCount ? Math.ceil(totalCount / data?.pageSize) : 0;
    }, [data]);

    useEffect(() => {
        setOrderList(data?.datas || []);
        const getDataStatisticOrder = async () => {
            const res = await GetOrderStatistic();
            setOrderListStatistic(res);
        };
        getDataStatisticOrder();
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
        <div className="space-y-8">
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCardRenevue type="orders" title="New Orders" value="1,390" />
                <StatCardRenevue type="sales" title="Sales" value="$57,890" />
                <StatCardRenevue type="revenue" title="Revenue" value="$12,390" />
                <StatCardRenevue type="products" title="Total Products" value="1,390" />
            </div> */}
            <div className="flex flex-col sm:flex-row gap-4 my-4 rounded-lg bg-gray-200 px-4 py-6">
                <StatCardProduct value={orderListStatistic?.amountPending} label="Pending Orders" type="pending" />
                <StatCardProduct value={orderListStatistic?.amountShipped} label="Shipped Orders" type="shipped" />
                <StatCardProduct value={orderListStatistic?.amountRecieved} label="Recieved Orders" type="recieved" />
                <StatCardProduct
                    value={orderListStatistic?.amountCancelled}
                    label="Cancelled Orders"
                    type="cancelled"
                />
            </div>

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
                                    index={(page - 1) * data?.pageSize + index}
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
        </div>
    );
}

export default BoardOrder;
