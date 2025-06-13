import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BackgroundCart from '~/components/BackgroundCart';
import ProductOrder from '~/components/ProductOrder';
import routes from '~/config/routes';
import { useStorage } from '~/Contexts';
import { OrderProduct } from '~/services/Order';
import { listPaymentByAcount } from './Constains';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddressDropdown from '~/components/AddressDropdown';
import useGetAddresses from '~/hooks/useGetAddresses';
import { UpdateAddressByUserId } from '~/services/User';

function Order() {
    const navigate = useNavigate();
    const { userData, dataCart, refetchProfile, refetchListCart } = useStorage();
    const { data, refetchAddress } = useGetAddresses(userData?.id);
    const [open, setOpen] = useState(false);
    const [listPayMethod, setListPayMethod] = useState(listPaymentByAcount);
    const [isActivePay, setIsActivePay] = useState(false);

    const productsOrder = useMemo(() => {
        return dataCart && dataCart.filter((cart) => cart.isSelectedForOrder).map((cart) => cart.product);
    }, [dataCart]);
    const selectedProductIds = useMemo(() => {
        return dataCart && dataCart.filter((cart) => cart.isSelectedForOrder).map((cart) => cart.id);
    }, [dataCart]);
    const totalProductCost = useMemo(() => {
        return (
            dataCart &&
            dataCart.filter((cart) => cart.isSelectedForOrder).reduce((sum, item) => sum + (item.total || 0), 0)
        );
    }, [dataCart]);

    const shippingFee = 30000;
    const finalTotal = totalProductCost + shippingFee;

    const handlePay = async () => {
        const maymentMethod = listPayMethod.find((method) => method.isActive);
        try {
            const res = await OrderProduct(userData?.id, {
                cartsId: selectedProductIds,
                paymentMethod: maymentMethod.method,
            });
            if (res.paymentUrl) {
                window.location.href = res.paymentUrl;
            } else {
                navigate(routes.cart);
                await refetchListCart();
            }
        } catch (err) {
            console.error('Payment error:', err);
        }
    };

    const handleChangePaymentMethod = async (data) => {
        setListPayMethod((prev) =>
            prev.map((item) =>
                item.value === data.value ? { ...item, isActive: true } : { ...item, isActive: false },
            ),
        );
    };
    const handleUpdateAddress = async (title, addressId) => {
        try {
            await UpdateAddressByUserId({ inputUserId: userData?.id, addressId: addressId });
            await refetchAddress();
            await refetchProfile();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="max-w-[1100px] mx-auto py-8 mt-[64px]">
            <div onClick={() => navigate(routes.cart)} className="text-black m-8 cursor-pointer hover:text-gray-500 ">
                <ArrowBackIcon style={{ fontSize: 20, marginRight: 8 }} />
                <span className="text-[20px] font-medium">Quay lại</span>
            </div>
            <BackgroundCart className="flex-col justify-end">
                <div className="text-red-500">
                    <AddLocationAltIcon style={{ fontSize: 20, marginRight: 8 }} />
                    <span className="text-[20px] font-medium">Địa Chỉ Nhận Hàng</span>
                </div>
                <div className="relative flex items-center text-black-400 space-x-4">
                    <div className="flex items-center font-bold">
                        <span className="text-[16px] mr-8">{userData?.lastName + ' ' + userData?.firstName}</span>
                        <span className="text-[16px] mr-4">{userData?.phone}</span>
                    </div>
                    <div className="text-[16px] font-medium">
                        {userData?.addresses.find((address) => address.isDefault).name}
                    </div>
                    <div className="text-[12px] text-red-400 font-sm ring-1 ring-red-400 p-[2px]">Mặc Định</div>
                    <div onClick={() => setOpen(true)} className="text-[16px] text-blue-400 font-sm cursor-pointer">
                        Thay đổi
                    </div>
                    <AddressDropdown
                        open={open}
                        data={data}
                        selectedId={userData?.addresses.find((address) => address.isDefault).id}
                        setValue={handleUpdateAddress}
                        setOpen={setOpen}
                        className={
                            'absolute right-28 top-10 z-8 bg-white border rounded-md w-[50%] mt-1 shadow max-h-60 overflow-auto'
                        }
                    />
                </div>
            </BackgroundCart>

            <BackgroundCart className={'items-center'}>
                <div className="flex-grow text-sm text-gray-900 font-medium">Sản phẩm</div>
                <div className="w-1/5 text-center text-sm text-gray-500 font-medium">Đơn giá</div>
                <div className="w-1/5 text-center text-sm text-gray-500 font-medium">Số lượng</div>
                <div className="w-1/5 text-center text-sm text-gray-500 font-medium">Số tiền</div>
            </BackgroundCart>
            <div className="flex flex-col items-center bg-white">
                <BackgroundCart className="w-full justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <span className="text-[16px] font-medium">Loại sản phẩm</span>
                    </div>
                </BackgroundCart>
                <BackgroundCart className="w-full items-center">
                    <ProductOrder products={productsOrder} />
                </BackgroundCart>
            </div>

            <BackgroundCart className="flex flex-col w-full items-end mt-8 mb-12">
                <div className="flex w-full items-center justify-between py-8 border-b">
                    <h3 className="text-2xl max-w-[400px] mr-8">Phương thức thanh toán</h3>
                    {isActivePay ? (
                        <div className="flex items-center flex-1">
                            {listPayMethod.map((item) => (
                                <p
                                    key={item.value}
                                    onClick={() => handleChangePaymentMethod(item)}
                                    className={`text-lg border p-2 rounded-sm ${
                                        item.isActive
                                            ? 'border-red-300 text-red-400'
                                            : 'hover:border-red-300 hover:text-red-400'
                                    } cursor-pointer mx-2`}
                                >
                                    {item.title}
                                </p>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center max-w-md w-full justify-between">
                            <p className="text-lg">Thanh toán khi nhận hàng</p>
                            <span
                                onClick={() => setIsActivePay(true)}
                                className="uppercase text-xl text-blue-500 cursor-pointer"
                            >
                                Thay đổi
                            </span>
                        </div>
                    )}
                </div>
                <div className="text-[16px] font-medium w-full max-w-md py-8">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-700">Tổng tiền hàng ({productsOrder?.length} sản phẩm):</span>
                        <span className="text-black-500 font-semibold">
                            {totalProductCost?.toLocaleString('vi-VN')}đ
                        </span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-700">Phí vận chuyển:</span>
                        <span className="text-black-500 font-semibold"> {shippingFee?.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-700">Tổng thành tiền:</span>
                        <span className="text-red-500 font-semibold">{finalTotal?.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <button
                        onClick={handlePay}
                        className="w-full py-2 bg-yellow-400 text-white text-sm font-bold rounded hover:bg-yellow-500"
                    >
                        Mua hàng
                    </button>
                </div>
            </BackgroundCart>
        </div>
    );
}

export default Order;
