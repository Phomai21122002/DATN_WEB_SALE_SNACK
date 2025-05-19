import HeaderTable from '~/components/HeaderTabel';
import SearchSortListOfAdmin from '~/components/SearchSortListOfAdmin';
import { useEffect, useMemo, useState } from 'react';
import routes from '~/config/routes';
import { useNavigate } from 'react-router-dom';
import { DeleteUserById, GetUsers } from '~/services/User';
import { listTitle, sorts } from './Constant';
import useGetUsers from '~/hooks/useGetUsers';
import Pagination from '~/components/Pagination';
import SkeletonRow from '~/components/SkeletonRow';
import noImage from '~/assets/images/No-image.png';

function BoardUser() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [allUser, setAllUser] = useState([]);
    const [idSort, setIdSort] = useState(null);
    const params = useMemo(() => {
        return { PageNumber: page };
    }, [page]);
    const { data, isLoading } = useGetUsers(params);

    const totalPages = useMemo(() => {
        const totalCount = data?.totalCount || 0;
        return totalCount ? Math.ceil(totalCount / data?.pageSize) : 0;
    }, [data]);

    useEffect(() => {
        setAllUser(data?.datas || []);
        setUsers(data?.datas || []);
    }, [data]);

    const editOrder = (id) => {
        navigate(routes.adminUpdateUser.replace(':id', id));
    };
    const deleteOrder = async (id) => {
        try {
            console.log(id);
            await DeleteUserById(id);
            setUsers((prev) => prev.filter((User) => User.id !== id));
        } catch (error) {
            console.error('Error fetching User data: ', error);
        }
    };

    const handleSortChange = (id) => {
        setIdSort(Number(id));
        if (Number(id) === 1) {
            setUsers(() => [...allUser].sort((a, b) => a.username?.localeCompare(b.username)));
        } else if (Number(id) === 2) {
            setUsers(() => [...allUser].sort((a, b) => a.email?.localeCompare(b.email)));
        } else if (Number(id) === 3) {
            setUsers(() => [...allUser].sort((a, b) => a.phoneNumber?.localeCompare(b.phoneNumber)));
        } else {
            setUsers(allUser);
        }
    };

    const handleSearchUser = (title) => {
        if (idSort === 1) {
            title
                ? setUsers(() =>
                      allUser.filter(
                          (User) =>
                              User.firstName?.toLowerCase().includes(title.toLowerCase()) ||
                              User.lastName?.toLowerCase().includes(title.toLowerCase()),
                      ),
                  )
                : setUsers(allUser);
        } else if (idSort === 2) {
            title
                ? setUsers(() => allUser.filter((User) => User.email?.toLowerCase().includes(title.toLowerCase())))
                : setUsers(allUser);
        } else if (idSort === 3) {
            title
                ? setUsers(() => allUser.filter((User) => User.phone?.toLowerCase().includes(title.toLowerCase())))
                : setUsers(allUser);
        } else {
            title
                ? setUsers(() =>
                      allUser.filter(
                          (User) =>
                              User.firstName?.toLowerCase().includes(title.toLowerCase()) ||
                              User.lastName?.toLowerCase().includes(title.toLowerCase()),
                      ),
                  )
                : setUsers(allUser);
        }
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
                                    <td className="py-3 px-6">{index + 1}</td>
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
                                    <td className="py-3 px-6">{User.role.name}</td>
                                    <td className="py-3 px-6">
                                        <button
                                            className="text-blue-600 hover:underline mr-2"
                                            onClick={() => editOrder(User.id)}
                                        >
                                            Chỉnh sửa
                                        </button>
                                        <button
                                            className="text-red-600 hover:underline"
                                            onClick={() => deleteOrder(User.id)}
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
            </div>
        </>
    );
}

export default BoardUser;
