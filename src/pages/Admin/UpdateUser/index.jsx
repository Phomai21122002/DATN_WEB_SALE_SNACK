import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import routes from '~/config/routes';
import { GetUserById, UpdateUserById } from '~/services/User';

function UpdateUser() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await GetUserById(id);
                reset({
                    id: res.id,
                    username: res.username,
                    email: res.email,
                    phoneNumber: res.phoneNumber,
                    // role: res.roles[0],
                });
            } catch (err) {
                console.error('Error fetching categories: ', err);
            }
        };
        getUser();
    }, [id, reset]);

    const handleUpdateUser = async (user) => {
        const { id, joinDate, role, ...userToDB } = user;
        const userReq = {
            ...userToDB,
            roles: [role],
        };
        try {
            await UpdateUserById(id, userReq);
            navigate(routes.adminListUser);
        } catch (err) {
            console.error('Error saving user:', err);
        }
    };

    const onSubmit = (data) => {
        handleUpdateUser(data);
        reset();
    };

    const handleBack = () => {
        navigate(routes.adminListUser);
    };

    return (
        <div className="bg-white p-4 shadow-md rounded-lg overflow-hidden">
            <h2 className="text-xl font-bold mb-4">Thông Tin Người Dùng</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-bold mb-1">Tên người dùng</label>
                    <input
                        type="text"
                        className="w-full text-sm p-2 border rounded-md"
                        {...register('username', { required: 'Tên người dùng là bắt buộc' })}
                        placeholder="Nhập tên người dùng"
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full text-sm p-2 border rounded-md"
                        {...register('email', {
                            required: 'Email là bắt buộc',
                            pattern: {
                                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: 'Email không hợp lệ',
                            },
                        })}
                        placeholder="Nhập email"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Số điện thoại</label>
                    <input
                        type="tel"
                        className="w-full text-sm p-2 border rounded-md"
                        {...register('phoneNumber', {
                            required: 'Số điện thoại là bắt buộc',
                            pattern: {
                                value: /^[0-9]{10,11}$/,
                                message: 'Số điện thoại không hợp lệ',
                            },
                        })}
                        placeholder="Nhập số điện thoại"
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Vai trò</label>
                    <select
                        className="w-full text-sm p-2 border rounded-md"
                        {...register('role', { required: 'Vai trò là bắt buộc' })}
                    >
                        <option value="">Chọn vai trò</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </select>
                    {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Ngày tham gia</label>
                    <input
                        type="date"
                        className="max-w-[200px] text-sm p-2 border rounded-md"
                        {...register('joinDate', { required: 'Ngày tham gia là bắt buộc' })}
                    />
                    {errors.joinDate && <p className="text-red-500 text-sm">{errors.joinDate.message}</p>}
                </div>

                <div className="flex gap-4">
                    <button type="submit" className="bg-blue-500 text-sm text-white p-2 rounded-md hover:bg-blue-600">
                        Lưu thông tin
                    </button>
                    <button
                        type="button"
                        className="bg-gray-500 text-sm text-white p-2 rounded-md hover:bg-gray-600"
                        onClick={handleBack}
                    >
                        Quay lại
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateUser;
