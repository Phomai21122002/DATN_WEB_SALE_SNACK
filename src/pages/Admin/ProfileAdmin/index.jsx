import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AddAddress from '~/components/AddAddress';
import { AddIcon } from '~/components/Icons';
import routes from '~/config/routes';
import { useStorage } from '~/Contexts';
import { UpdateAddressByUserId, UpdateUserById } from '~/services/User';

function ProfileAdmin() {
    const navigate = useNavigate();
    const { userData } = useStorage();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            id: userData?.id,
            firstName: userData?.firstName,
            lastName: userData?.lastName,
            email: userData?.email,
            phone: userData?.phone,
            addressId: userData?.addresses?.find((address) => address?.isDefault && address)?.id,
        },
    });
    const [activeAddAddress, setActiveAddAddress] = useState(false);

    const handleSaveProfile = async (profile) => {
        const { id, addressId, ...reqProfile } = profile;
        const updatedProfile = {
            ...reqProfile,
            url: 'image',
        };

        try {
            await UpdateUserById(id, updatedProfile);
            await UpdateAddressByUserId({
                inputUserId: id,
                addressId: Number(addressId),
            });
            navigate(routes.home);
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
                <div className="flex items-center">
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

                {activeAddAddress && (
                    <AddAddress activeAddAddress={activeAddAddress} setActiveAddAddress={setActiveAddAddress} />
                )}
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-bold mb-1">Địa chỉ</label>
                        <button
                            type="button"
                            className="bg-red-500 text-sm text-white p-1 rounded-md hover:bg-red-600"
                            onClick={() => setActiveAddAddress(!activeAddAddress)}
                        >
                            <AddIcon />
                        </button>
                    </div>
                    <select
                        className="w-full text-sm p-2 border rounded-md"
                        {...register('addressId', { required: 'Địa chỉ nhà là bắt buộc' })}
                    >
                        <option value="">Chọn địa chỉ</option>
                        {userData?.addresses?.map((address, index) => (
                            <option key={index} value={address.id}>
                                {address.name}
                            </option>
                        ))}
                    </select>
                    {errors.addressId && <p className="text-red-500 text-sm">{errors.addressId.message}</p>}
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
