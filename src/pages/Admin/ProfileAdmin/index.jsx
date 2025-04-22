import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import { GetProfile, UpdateUserById } from '~/services/User';

function ProfileAdmin() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [dataProfile, setDataProfile] = useState([]);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const res = await GetProfile();
                setDataProfile(res);
                reset({
                    id: res.id,
                    username: res.username,
                    email: res.email,
                    phoneNumber: res.phoneNumber,
                });
            } catch (err) {
                console.error('Error fetching categories: ', err);
            }
        };
        getProfile();
    }, [reset]);

    const handleSaveProfile = async (profile) => {
        const { id, ...profileToDB } = profile;
        const profileReq = {
            ...profileToDB,
            roles: ['Admin'],
        };
        try {
            await UpdateUserById(id, profileReq);
            navigate(routes.admin);
        } catch (err) {
            console.error('Error saving profile:', err);
        }
    };

    const onSubmit = (data) => {
        handleSaveProfile(data);
        reset();
    };

    const handleBack = () => {
        navigate(routes.admin);
    };

    return (
        <div className="bg-white p-4 shadow-md rounded-lg overflow-hidden">
            <h2 className="text-xl font-bold mb-4">Thông Tin Admin</h2>
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
                    <label className="block text-sm font-bold mb-1">Địa chỉ</label>
                    <select
                        className="w-full text-sm p-2 border rounded-md"
                        {...register('address', { required: 'Địa chỉ là bắt buộc' })}
                    >
                        <option value="">Chọn địa chỉ</option>
                        {dataProfile?.addresses?.map((profile, index) => (
                            <option key={index} value={profile.city}>
                                {profile.city}
                            </option>
                        ))}
                    </select>
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
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

export default ProfileAdmin;
