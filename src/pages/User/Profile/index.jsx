import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import routes from '~/config/routes';
import { UpdateUserById, AddAddressByUserId } from '~/services/User';
import { useStorage } from '~/Contexts';
import AddAddress from '~/components/AddAddress';

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
    const codeWard = watch('addresses');

    useEffect(() => {
        const getProfile = async () => {
            try {
                if (Object.keys(userData).length > 0) {
                    const address = userData?.userAddresses?.find((address) => address?.isDefault && address);
                    reset({
                        id: userData.id,
                        username: userData.lastName + ' ' + userData.firstName,
                        email: userData.email,
                        phoneNumber: userData.phone,
                        addresses: address?.wardCode,
                        homeNumber: address?.detail,
                    });
                }
            } catch (err) {
                console.error('Error fetching profile or provinces:', err);
            }
        };
        getProfile();
    }, [reset, activeAddAddress, userData]);

    const handleSaveProfile = async (profile) => {
        const { district, province, id, ward, homeNumber, addresses, ...reqProfile } = profile;
        try {
            await UpdateUserById(id, { ...reqProfile });
            await AddAddressByUserId({
                address: {
                    detail: homeNumber,
                    wardCode: addresses ? codeWard : ward,
                },
                isDefault: true,
            });

            navigate(routes.home);
        } catch (err) {
            console.error('Error saving profile:', err);
        }
    };

    const handleBack = () => {
        navigate(routes.home);
    };

    return (
        <div className="flex flex-col items-center justify-center mt-24 bg-white p-4">
            <h2 className="text-xl font-bold mb-4 uppercase">Thông Tin Người Dùng</h2>
            <form
                onSubmit={handleSubmit(handleSaveProfile)}
                className="bg-gray-300 min-w-[1000px] p-4 flex flex-col gap-4 shadow-md rounded-lg overflow-hidden"
            >
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
                        {...register('addresses', { required: 'Địa chỉ nhà là bắt buộc' })}
                    >
                        <option value="">Chọn địa chỉ</option>
                        {userData?.addresses?.map((address, index) => (
                            <option key={index} value={address.wardCode}>
                                {address.path_With_Type}
                            </option>
                        ))}
                    </select>
                    {errors.addresses && <p className="text-red-500 text-sm">{errors.addresses.message}</p>}
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
