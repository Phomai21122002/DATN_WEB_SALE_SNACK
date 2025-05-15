import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { EditIcon } from '~/components/Icons';
import routes from '~/config/routes';
import { GetUserById, UpdateUserById } from '~/services/User';
import { uploadMediaToCloudinary } from '../CreateProduct/Constant';
import noImage from '~/assets/images/No-image.png';
import { GetRoles } from '~/services/Role';

function UpdateUser() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm();
    const image = watch('url');
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            try {
                const resRoles = await GetRoles();
                setRoles(resRoles);
                const res = await GetUserById(id);
                reset({
                    id: res.id,
                    firstName: res.firstName,
                    lastName: res.lastName,
                    email: res.email,
                    phone: res.phone,
                    role: res.role?.name || '',
                    joinDate: res.createdAt?.split('T')[0] || '',
                    url: res.url,
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
            url: user.url,
        };
        console.log(userReq);
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

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const uploadedUrl = await uploadMediaToCloudinary(file);
                if (uploadedUrl) setValue('url', uploadedUrl);
            } catch (err) {
                console.error('Error uploading image:', err);
            }
        }
    };

    return (
        <div className="bg-white p-4 shadow-md rounded-lg overflow-hidden">
            <h2 className="text-xl font-bold mb-4">Thông Tin Người Dùng</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div
                    className="relative w-32 h-32 mb-4 mx-auto group cursor-pointer"
                    onClick={() => document.getElementById('avatarInput')?.click()}
                >
                    <img
                        src={image || noImage}
                        alt="Avatar"
                        className="w-full h-full object-cover rounded-full border-2 border-gray-400 group-hover:border-blue-500 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <EditIcon className="text-white w-6 h-6" />
                    </div>
                    <input
                        type="file"
                        id="avatarInput"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                    />
                </div>
                <div className="flex items-center justify-between gap-32">
                    <div className="flex-1">
                        <label className="block text-sm font-bold mb-1">Tên người dùng</label>
                        <input
                            type="text"
                            className="w-full text-sm p-2 border rounded-md"
                            {...register('firstName', { required: 'Tên người dùng là bắt buộc' })}
                            placeholder="Nhập tên người dùng"
                        />
                        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-bold mb-1">Họ người dùng</label>
                        <input
                            type="text"
                            className="w-full text-sm p-2 border rounded-md"
                            {...register('lastName', { required: 'Tên người dùng là bắt buộc' })}
                            placeholder="Nhập họ người dùng"
                        />
                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Email</label>
                    <input
                        type="email"
                        readOnly
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
                        {...register('phone', {
                            required: 'Số điện thoại là bắt buộc',
                            pattern: {
                                value: /^[0-9]{10,11}$/,
                                message: 'Số điện thoại không hợp lệ',
                            },
                        })}
                        placeholder="Nhập số điện thoại"
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Vai trò</label>
                    <select
                        className="w-full text-sm p-2 border rounded-md"
                        {...register('role', { required: 'Vai trò là bắt buộc' })}
                    >
                        <option value="">Chọn vai trò</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.name}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                    {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Ngày tham gia</label>
                    <input
                        type="date"
                        readOnly
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
