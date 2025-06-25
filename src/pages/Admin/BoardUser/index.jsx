import HeaderTable from '~/components/HeaderTabel';
import SearchSortListOfAdmin from '~/components/SearchSortListOfAdmin';
import { useEffect, useMemo, useState } from 'react';
import routes from '~/config/routes';
import { useNavigate } from 'react-router-dom';
import { DeleteUserById } from '~/services/User';
import { listTitle, sorts } from './Constant';
import useGetUsers from '~/hooks/useGetUsers';
import Pagination from '~/components/Pagination';
import SkeletonRow from '~/components/SkeletonRow';
import noImage from '~/assets/images/No-image.png';
import { removeVietnameseTones } from '../Category/Constant';
import PopUpRemove from '~/components/PopUpRemove';
import { useStorage } from '~/Contexts';
import { GetDataOnCSV } from '~/services/Product';

function BoardUser() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [allUser, setAllUser] = useState([]);
    const [nameSearch, setNameSearch] = useState(null);
    const [nameSort, setNameSort] = useState(null);
    const [chooseRemove, setChooseRemove] = useState({});
    const { token } = useStorage();

    const params = useMemo(() => {
        return { PageNumber: page, Name: nameSearch, SortBy: nameSort };
    }, [page, nameSearch, nameSort]);
    const { data, isLoading, refetch } = useGetUsers(params);

    const totalPages = useMemo(() => {
        const totalCount = data?.totalCount || 0;
        return totalCount ? Math.ceil(totalCount / data?.pageSize) : 0;
    }, [data]);

    useEffect(() => {
        setAllUser(data?.datas || []);
        setUsers(data?.datas || []);
    }, [data]);

    const editUser = (id) => {
        navigate(routes.adminUpdateUser.replace(':id', id));
    };
    const deleteUser = async (user) => {
        try {
            await DeleteUserById(user?.id);
            refetch();
            setChooseRemove({});
            if (token) GetDataOnCSV({ token: token });
        } catch (error) {
            console.error('Error fetching User data: ', error);
        }
    };

    const handleSortChange = (id) => {
        if (Number(id) === 1) {
            setNameSort('name');
        } else if (Number(id) === 2) {
            setNameSort('email');
        } else if (Number(id) === 3) {
            setNameSort('phone');
        } else {
            setUsers(allUser);
        }
    };

    const handleSearchUser = (title) => {
        setNameSearch(removeVietnameseTones(title?.toLowerCase()));
    };

    return (
        <>
            <SearchSortListOfAdmin
                title={'Chọn để sắp xếp và tìm kiếm'}
                categories={sorts}
                onSortChange={handleSortChange}
                onSearch={handleSearchUser}
            />
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full text-left text-sm">
                    <HeaderTable listTitle={listTitle} />
                    <tbody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, idx) => <SkeletonRow key={idx} col={listTitle.length} />)
                        ) : users?.length > 0 ? (
                            users.map((User, index) => (
                                <tr key={User.id} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-6">{(page - 1) * data?.pageSize + index + 1}</td>
                                    <td className="py-3 px-6">
                                        {User.url && (
                                            <img
                                                src={User.url || noImage}
                                                alt={`user-${User?.firstName + ' ' + User?.lastNam}`}
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                        )}
                                    </td>
                                    <td className="py-3 px-6">{User.firstName + ' ' + User.lastName}</td>
                                    <td className="py-3 px-6">{User.email}</td>
                                    <td className="py-3 px-6">{User.phone}</td>
                                    <td className="py-3 px-6">{User?.role?.name}</td>
                                    <td className="py-3 px-6">
                                        <button
                                            className="text-blue-600 hover:underline mr-2"
                                            onClick={() => editUser(User.id)}
                                        >
                                            Chỉnh sửa
                                        </button>
                                        <button
                                            className="text-red-600 hover:underline"
                                            onClick={() => setChooseRemove(User)}
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={listTitle.length} className="text-center py-6 text-gray-500">
                                    Không có người dùng nào
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Pagination className={'m-8 justify-end'} page={page} setPage={setPage} totalPages={totalPages} />
                {chooseRemove && (
                    <PopUpRemove
                        id={chooseRemove.id}
                        title={'Xóa người dùng'}
                        desc={`Bạn có chắc chắn muốn xóa khách hàng ${
                            chooseRemove?.firstName + ' ' + chooseRemove?.lastName
                        } này không?`}
                        onRemove={() => deleteUser(chooseRemove)}
                        onClose={() => setChooseRemove({})}
                        isRemove={Object.keys(chooseRemove).length > 0}
                    />
                )}
            </div>
        </>
    );
}

export default BoardUser;
