import HeaderTable from '~/components/HeaderTabel';
import { listTitleUser } from './Constant';
import { useEffect, useMemo, useState } from 'react';
import { useStorage } from '~/Contexts';
import useGetBills from '~/hooks/useGetBills';
import Pagination from '~/components/Pagination';
import SkeletonRow from '~/components/SkeletonRow';
import BodyTabelBill from '../../../components/BodyTabelBill';

function BoardBill() {
    const { userData } = useStorage();
    const [page, setPage] = useState(1);
    const [orderList, setOrderList] = useState([]);

    const { data, isLoading } = useGetBills({
        userId: userData?.id,
        PageNumber: page,
    });

    useEffect(() => {
        setOrderList(data?.datas ?? []);
    }, [data]);

    const totalPages = useMemo(() => {
        const totalCount = data?.totalCount || 0;
        return totalCount ? Math.ceil(totalCount / data?.pageSize) : 0;
    }, [data]);

    const showBill = (bill) => {
        console.log(bill);
    };

    return (
        <div className="flex flex-col items-center mt-32 pb-8 bg-white shadow-md rounded-lg overflow-hidden px-4">
            <div className="overflow-x-auto max-w-[1500px] mx-auto w-full">
                <table className="min-w-[1000px] text-left text-sm w-full">
                    <HeaderTable listTitle={listTitleUser} />
                    <tbody>
                        {isLoading ? (
                            Array.from({ length: 10 }).map((_, idx) => (
                                <SkeletonRow key={idx} col={listTitleUser.length} />
                            ))
                        ) : Array.isArray(orderList) && orderList.length > 0 ? (
                            orderList.map((order, index) => (
                                <BodyTabelBill key={order.id} index={index} item={order} onShow={showBill} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={listTitleUser.length} className="text-center py-4">
                                    Không có dữ liệu đơn hàng.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
    );
}

export default BoardBill;
