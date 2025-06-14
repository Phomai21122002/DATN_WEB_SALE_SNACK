import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

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
import { removeVietnameseTones } from '../Category/Constant';

function BoardConfirmOrder() {
    const { userData } = useStorage();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [orderList, setOrderList] = useState([]);
    const [chooseRemove, setChooseRemove] = useState({});
    const [nameSearch, setNameSearch] = useState(null);
    const [searchOrder, setSearchOrder] = useState('');

    const params = useMemo(() => {
        if (!userData?.id) return null;
        return { Name: nameSearch, userId: userData.id, Status: 2, PageNumber: page };
    }, [userData, page, nameSearch]);
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
                        title={'Hủy đơn đặt hàng'}
                        desc={`Bạn có chắc chắn muốn hủy đơn hàng ${chooseRemove?.name} của khách hàng ${chooseRemove?.user?.firstName}?`}
                        onRemove={() => deleteOrder(chooseRemove)}
                        onClose={() => setChooseRemove({})}
                        isRemove={Object.keys(chooseRemove).length > 0}
                    />
                )}
            </div>
        </>
    );
}

export default BoardConfirmOrder;
