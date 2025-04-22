import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import routes from '~/config/routes';
import { GetProfile, GetProvinces, GetDistricts, GetWards, UpdateUserById, UpdateAddress } from '~/services/User';

function Profile() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();

    const [dataProfile, setDataProfile] = useState([]);
    const [dataProvinces, setDataProvinces] = useState([]);
    const [dataDistrict, setDataDistrict] = useState([]);
    const [dataWard, setDataWard] = useState([]);
    const [activeAddAddress, setActiveAddAddress] = useState(false);

    const selectedProvince = watch('province');
    const selectedDistrict = watch('district');
    const selectedWard = watch('ward');
    const codeWard = watch('addresses');

    useEffect(() => {
        const getProfile = async () => {
            try {
                const profileRes = await GetProfile();
                setDataProfile(profileRes);
                const address = profileRes.addresses.find((address) => address.isDefault && address);
                reset({
                    id: profileRes.id,
                    username: profileRes.username,
                    email: profileRes.email,
                    phoneNumber: profileRes.phoneNumber,
                    addresses: address?.wardCode,
                    homeNumber: address?.detail,
                });

                const provincesRes = await GetProvinces();
                setDataProvinces(provincesRes);
            } catch (err) {
                console.error('Error fetching profile or provinces:', err);
            }
        };
        getProfile();
    }, [reset, activeAddAddress]);

    useEffect(() => {
        const fetchDistricts = async () => {
            if (selectedProvince) {
                try {
                    const districtsRes = await GetDistricts(selectedProvince);
                    setDataDistrict(districtsRes);
                    setDataWard([]); // Reset wards when province changes
                } catch (err) {
                    console.error('Error fetching districts:', err);
                }
            }
        };
        fetchDistricts();
    }, [selectedProvince]);

    useEffect(() => {
        const fetchWards = async () => {
            if (selectedDistrict) {
                try {
                    const wardsRes = await GetWards(selectedDistrict);
                    setDataWard(wardsRes);
                } catch (err) {
                    console.error('Error fetching wards:', err);
                }
            }
        };
        fetchWards();
    }, [selectedDistrict]);

    const handleSaveProfile = async (profile) => {
        const { district, province, id, ward, homeNumber, addresses, ...reqProfile } = profile;
        try {
            await UpdateUserById(id, { ...reqProfile });
            await UpdateAddress({
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

    const onSubmit = (data) => {
        handleSaveProfile(data);
    };

    const handleBack = () => {
        navigate(routes.home);
    };

    const handleAddAddress = async () => {
        await UpdateAddress({
            address: {
                detail: '42 Nguyễn Trãi',
                wardCode: selectedWard,
            },
            isDefault: false,
        });
        setActiveAddAddress(!activeAddAddress);
    };

    return (
        <div className="flex flex-col items-center justify-center mt-24 bg-white p-4">
            <h2 className="text-xl font-bold mb-4 uppercase">Thông Tin Người Dùng</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
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

                {(dataProfile?.addresses?.length <= 0 || activeAddAddress) && (
                    <>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-bold mb-1">Tỉnh / Thành Phố</label>
                                <select
                                    className="w-full text-sm p-2 border rounded-md"
                                    {...register('province', { required: 'Tỉnh / Thành Phố là bắt buộc' })}
                                >
                                    <option value="">Chọn tỉnh thành</option>
                                    {dataProvinces.map((province, index) => (
                                        <option key={index} value={province.code}>
                                            {province.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.province && <p className="text-red-500 text-sm">{errors.province.message}</p>}
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-bold mb-1">Huyện</label>
                                <select
                                    className="w-full text-sm p-2 border rounded-md"
                                    {...register('district', { required: 'Huyện là bắt buộc' })}
                                >
                                    <option value="">Chọn huyện</option>
                                    {dataDistrict.map((district, index) => (
                                        <option key={index} value={district.code}>
                                            {district.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.district && <p className="text-red-500 text-sm">{errors.district.message}</p>}
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-bold mb-1">Phường</label>
                                <select
                                    className="w-full text-sm p-2 border rounded-md"
                                    {...register('ward', { required: 'Phường là bắt buộc' })}
                                >
                                    <option value="">Chọn phường</option>
                                    {dataWard.map((ward, index) => (
                                        <option key={index} value={ward.code}>
                                            {ward.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.ward && <p className="text-red-500 text-sm">{errors.ward.message}</p>}
                            </div>
                        </div>
                        {activeAddAddress && (
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    className="bg-blue-500 text-sm text-white p-2 rounded-md hover:bg-blue-600"
                                    onClick={handleAddAddress}
                                >
                                    Thêm
                                </button>

                                <button
                                    type="button"
                                    className="bg-gray-500 text-sm text-white p-2 rounded-md hover:bg-gray-600"
                                    onClick={() => setActiveAddAddress((prev) => !prev && !prev)}
                                >
                                    Đóng
                                </button>
                            </div>
                        )}
                    </>
                )}

                {dataProfile?.addresses?.length > 0 && (
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
                            {...register('addresses', { required: 'Phường là bắt buộc' })}
                        >
                            <option value="">Chọn địa chỉ</option>
                            {dataProfile?.addresses?.map((address, index) => (
                                <option key={index} value={address.wardCode}>
                                    {address.path_With_Type}
                                </option>
                            ))}
                        </select>
                        {errors.addresses && <p className="text-red-500 text-sm">{errors.addresses.message}</p>}
                    </div>
                )}

                <div>
                    <label className="block text-sm font-bold mb-1">Số nhà</label>
                    <input
                        type="tel"
                        className="w-full text-sm p-2 border rounded-md"
                        {...register('homeNumber', {
                            required: 'Số nhà là bắt buộc',
                            pattern: {
                                message: 'Số nhà không hợp lệ',
                            },
                        })}
                        placeholder="Nhập số nhà"
                    />
                    {errors.homeNumber && <p className="text-red-500 text-sm">{errors.homeNumber.message}</p>}
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

export default Profile;
