import HeaderTable from '~/components/HeaderTabel';
import SearchSortListOfAdmin from '~/components/SearchSortListOfAdmin';
import { useEffect, useState } from 'react';
import routes from '~/config/routes';
import { useNavigate } from 'react-router-dom';
import { DeleteUserById, GetUsers } from '~/services/User';
import { listTitle, sorts } from './Constant';

function BoardUser() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [allUser, setAllUser] = useState([]);
    const [idSort, setIdSort] = useState(null);

    useEffect(() => {
        const getAllUser = async () => {
            try {
                const res = await GetUsers();
                setUsers(res);
                setAllUser(res);
            } catch (err) {
                console.error('Error fetching User data: ', err);
            }
        };
        getAllUser();
    }, []);

    const editOrder = (id) => {
        navigate(routes.adminUpdateUser.replace(':id', id));
    };
    const deleteOrder = async (id) => {
        try {
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

    const handleSearchProduct = (title) => {
        if (idSort === 1) {
            title
                ? setUsers(() => allUser.filter((User) => User.username?.toLowerCase().includes(title.toLowerCase())))
                : setUsers(allUser);
        } else if (idSort === 2) {
            title
                ? setUsers(() => allUser.filter((User) => User.email?.toLowerCase().includes(title.toLowerCase())))
                : setUsers(allUser);
        } else if (idSort === 3) {
            title
                ? setUsers(() =>
                      allUser.filter((User) => User.phoneNumber?.toLowerCase().includes(title.toLowerCase())),
                  )
                : setUsers(allUser);
        } else {
            title
                ? setUsers(() => allUser.filter((User) => User.roles[0]?.toLowerCase().includes(title.toLowerCase())))
                : setUsers(allUser);
        }
    };
    return (
        <>
            <SearchSortListOfAdmin
                title={'Chọn để sắp xếp và tìm kiếm'}
                categories={sorts}
                onSortChange={handleSortChange}
                onSearch={handleSearchProduct}
            />
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full text-left text-sm">
                    <HeaderTable listTitle={listTitle} />
                    <tbody>
                        {users?.map((User, index) => (
                            <tr key={User.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-6">{index + 1}</td>
                                <td className="py-3 px-6">{User.username}</td>
                                <td className="py-3 px-6">{User.email}</td>
                                <td className="py-3 px-6">{User.phoneNumber}</td>
                                <td className="py-3 px-6">{User.roles[0]}</td>
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
                        ))}
                    </tbody>
                </table>
                {users.length === 0 && <div className="text-center py-6 text-gray-500">Không có đơn hàng nào</div>}
            </div>
        </>
    );
}

export default BoardUser;
