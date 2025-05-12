import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import routes from '~/config/routes';
import { UpdateUserById, AddAddressByUserId, UpdateAddressByUserId } from '~/services/User';
import { useStorage } from '~/Contexts';
import AddAddress from '~/components/AddAddress';
import noImage from '~/assets/images/No-image.png';
import { uploadMediaToCloudinary } from '~/pages/Admin/CreateProduct/Constant';
import EditIcon from '@mui/icons-material/Edit';

function Profile() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();
    const { userData } = useStorage();
    const [activeAddAddress, setActiveAddAddress] = useState(false);
    const [image, setImage] = useState(watch('url'));

    useEffect(() => {
        console.log('profile', userData);
        const getProfileOfUser = async () => {
            try {
                if (Object.keys(userData).length > 0) {
                    const address = userData?.addresses?.find((address) => address?.isDefault && address);
                    reset({
                        id: userData.id,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        email: userData.email,
                        phone: userData.phone,
                        addressId: address?.id,
                        url: userData.url,
                    });
                }
            } catch (err) {
                console.error('Error fetching profile or provinces:', err);
            }
        };
        getProfileOfUser();
        // eslint-disable-next-line
    }, [userData]);

    const handleSaveProfile = async (profile) => {
        const { id, addressId, ...reqProfile } = profile;
        const updatedProfile = {
            ...reqProfile,
            url: image,
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

    const handleBack = () => {
        navigate(routes.home);
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const uploadedUrl = await uploadMediaToCloudinary(file);
                if (uploadedUrl) setImage(uploadedUrl);
            } catch (err) {
                console.error('Error uploading image:', err);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mt-24 bg-white p-4">
            <h2 className="text-xl font-bold mb-4 uppercase">Thông Tin Người Dùng</h2>
            <form
                onSubmit={handleSubmit(handleSaveProfile)}
                className="bg-gray-300 min-w-[1000px] p-4 flex flex-col gap-4 shadow-md rounded-lg overflow-hidden"
            >
                <div
                    className="relative w-32 h-32 mb-4 mx-auto group cursor-pointer"
                    onClick={() => document.getElementById('avatarInput')?.click()}
                >
                    <img
                        src={image || userData?.url || noImage}
                        alt="Avatar"
                        className="w-full h-full object-cover rounded-full border-2 border-gray-400 group-hover:border-blue-500 transition-all duration-300"
                    />
                    {/* Overlay khi hover */}
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

export default memo(Profile);
