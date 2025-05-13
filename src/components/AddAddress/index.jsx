import { useStorage } from '~/Contexts';
import { memo, useEffect, useState } from 'react';
import { AddAddressByUserId, GetDistricts, GetProvinces, GetWards } from '~/services/User';
import { useForm } from 'react-hook-form';

function AddAddress({ activeAddAddress, setActiveAddAddress }) {
    const {
        register,
        watch,
        formState: { errors },
    } = useForm();
    const { userData, refetchProfile } = useStorage();
    const [dataProvinces, setDataProvinces] = useState([]);
    const [dataDistrict, setDataDistrict] = useState([]);
    const [dataWard, setDataWard] = useState([]);
    const selectedProvince = watch('province');
    const selectedDistrict = watch('district');
    const selectedWard = watch('ward');
    const selectedHomeNumber = watch('homeNumber');

    useEffect(() => {
        console.log('addaddress');
        const getProfile = async () => {
            try {
                if (Object.keys(userData).length > 0) {
                    const provincesRes = await GetProvinces(userData.id);
                    setDataProvinces(provincesRes);
                }
            } catch (err) {
                console.error('Error fetching profile or provinces:', err);
            }
        };
        getProfile();
    }, [userData]);

    useEffect(() => {
        const fetchDistricts = async () => {
            if (selectedProvince) {
                try {
                    const districtsRes = await GetDistricts(userData.id, selectedProvince);
                    setDataDistrict(districtsRes);
                    setDataWard([]);
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
                    const wardsRes = await GetWards(userData.id, selectedDistrict);
                    setDataWard(wardsRes);
                } catch (err) {
                    console.error('Error fetching wards:', err);
                }
            }
        };
        fetchWards();
    }, [selectedDistrict]);

    const handleAddAddress = async () => {
        const selectedWardObj = dataWard.find((ward) => ward.code === selectedWard);
        await AddAddressByUserId({
            inputUserId: userData.id,
            name: selectedHomeNumber + ', ' + selectedWardObj.path_with_type,
            code: Number(selectedWard),
        });
        await refetchProfile();
        setActiveAddAddress(!activeAddAddress);
    };

    return (
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
                    onClick={() => setActiveAddAddress((prev) => !prev)}
                >
                    Đóng
                </button>
            </div>
        </>
    );
}

export default memo(AddAddress);
