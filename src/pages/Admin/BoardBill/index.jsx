import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import HeaderTable from '~/components/HeaderTabel';
import { listTitle } from './Constant';
import { useEffect, useMemo, useState } from 'react';
import { useStorage } from '~/Contexts';
import Pagination from '~/components/Pagination';
import SkeletonRow from '~/components/SkeletonRow';
import useGetBillAdmins from '~/hooks/useGetBillAdmins';
import BodyTabelBill from '~/components/BodyTabelBill';
import { removeVietnameseTones } from '../Category/Constant';

function BoardBill() {
    const { userData } = useStorage();
    const [page, setPage] = useState(1);
    const [orderList, setOrderList] = useState([]);
    const [searchOrder, setSearchOrder] = useState('');
    const [nameSearch, setNameSearch] = useState(null);

    const { data, isLoading } = useGetBillAdmins({
        Name: nameSearch,
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
        // navigate(routes.adminUpdateOrder.replace(':id', bill.id));
    };
    const handleSearchProduct = () => {
        setNameSearch(removeVietnameseTones(searchOrder?.toLowerCase()));
    };
    return (
        <>
            <div className="flex items-center justify-end m-4">
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={searchOrder}
                    onChange={(e) => setSearchOrder(e.target.value)}
                    className="ml-2 max-w-[300px] ring-2 ring-gray-300 rounded-lg p-[6px] text-sm text-gray-700"
                />
                <div
                    onClick={handleSearchProduct}
                    className="group absolute rounded-tr-md rounded-br-md px-2 transition duration-200 cursor-pointer"
                >
                    <SearchOutlinedIcon
                        sx={{ fontSize: '20px' }}
                        className="text-gray-500 group-hover:text-yellow-500"
                    />
                </div>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full text-left text-sm">
                    <HeaderTable listTitle={listTitle} />
                    <tbody>
                        {isLoading ? (
                            Array.from({ length: 10 }).map((_, idx) => <SkeletonRow key={idx} col={listTitle.length} />)
                        ) : orderList.length > 0 ? (
                            orderList.map((order, index) => (
                                <BodyTabelBill
                                    key={order.id}
                                    index={(page - 1) * data?.pageSize + index}
                                    item={order}
                                    onShow={showBill}
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
        </>
    );
}

export default BoardBill;
