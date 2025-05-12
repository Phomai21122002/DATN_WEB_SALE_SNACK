import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import BackgroundCart from '~/components/BackgroundCart';
import ProductOrder from '~/components/ProductOrder';
import routes from '~/config/routes';
import { useStorage } from '~/Contexts';
import { OrderProduct } from '~/services/Order';
import { GetPaymentVnpay } from '~/services/Payment';
import { listPaymentByAcount } from './Constains';

function Order() {
    const { userData, dataCart } = useStorage();
    const [params] = useSearchParams();
    const [orderData, setOrderData] = useState(null);
    const [listPayMethod, setListPayMethod] = useState([]);

    const productsOrder = useMemo(() => {
        return dataCart.filter((cart) => cart.isSelectedForOrder).map((cart) => cart.product);
    }, [dataCart]);
    const selectedProductIds = useMemo(() => {
        return dataCart.filter((cart) => cart.isSelectedForOrder).map((cart) => cart.id);
    }, [dataCart]);
    const totalProductCost = useMemo(() => {
        return dataCart.reduce((sum, item) => sum + (item.total || 0), 0);
    }, [dataCart]);

    const shippingFee = 30000;
    const finalTotal = totalProductCost + shippingFee;

    useEffect(() => {
        const fetchPaymentResult = async () => {
            try {
                const res = await GetPaymentVnpay(params);
                setOrderData(res);
            } catch (err) {
                console.error('Failed to fetch payment result', err);
            }
        };

        fetchPaymentResult();
    }, [params]);

    const handlePay = async () => {
        const maymentMethod = listPayMethod.find((method) => method.isActive);
        try {
            const res = await OrderProduct(userData?.id, {
                cartsId: selectedProductIds,
                paymentMethod: maymentMethod.method,
            });
            if (res.paymentUrl) {
                window.location.href = res.paymentUrl;
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
    console.log(listPayMethod.length);
    return (
        <div className="max-w-[1100px] mx-auto py-8 mt-[64px]">
            <BackgroundCart className="flex-col justify-end">
                <div className="text-red-500">
                    <AddLocationAltIcon style={{ fontSize: 20, marginRight: 8 }} />
                    <span className="text-[20px] font-medium">Địa Chỉ Nhận Hàng</span>
                </div>
                <div className="flex items-center text-black-400 space-x-4">
                    <div className="flex items-center font-bold">
                        <span className="text-[16px]">Username</span>
                        <span className="text-[16px]">Phone</span>
                    </div>
                    <div className="text-[16px] font-medium">Address</div>
                    <div className="text-[12px] text-red-400 font-sm ring-1 ring-red-400 p-[2px]">Mặc Định</div>
                    <div className="text-[16px] text-blue-400 font-sm cursor-pointer">Thay đổi</div>
                </div>
            </BackgroundCart>
            {orderData && (
                <div className="max-w-[1100px] mx-auto py-8 mt-[64px]">
                    <BackgroundCart className="flex-col justify-end">
                        <div className="text-red-500">
                            <AddLocationAltIcon style={{ fontSize: 20, marginRight: 8 }} />
                            <span className="text-[20px] font-medium">Kết quả thanh toán</span>
                        </div>
                        <div className="flex items-center text-black-400 space-x-4">
                            <div className="text-[16px] font-medium">
                                {orderData.success ? 'Thanh toán thành công!' : 'Thanh toán thất bại'}
                            </div>
                            <div className="text-[16px] font-medium">{orderData.orderDescription}</div>
                        </div>
                    </BackgroundCart>
                </div>
            )}

            <BackgroundCart className={'items-center'}>
                <div className="flex-grow text-sm text-gray-900 font-medium">Sản phẩm</div>
                <div className="w-32 text-center text-sm text-gray-500 font-medium">Đơn giá</div>
                <div className="w-32 text-center text-sm text-gray-500 font-medium">Số lượng</div>
                <div className="w-32 text-center text-sm text-gray-500 font-medium">Số tiền</div>
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
                    {listPayMethod.length === 0 ? (
                        <div className="flex items-center max-w-md w-full justify-between">
                            <p className="text-lg">Thanh toán khi nhận hàng</p>
                            <span
                                onClick={() => setListPayMethod(listPaymentByAcount)}
                                className="uppercase text-xl text-blue-500 cursor-pointer"
                            >
                                Thay đổi
                            </span>
                        </div>
                    ) : (
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
                    )}
                </div>
                <div className="text-[16px] font-medium w-full max-w-md py-8">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-700">Tổng tiền hàng ({productsOrder.length} sản phẩm):</span>
                        <span className="text-black-500 font-semibold">
                            {totalProductCost.toLocaleString('vi-VN')}đ
                        </span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-700">Phí vận chuyển:</span>
                        <span className="text-black-500 font-semibold"> {shippingFee.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-700">Tổng thành tiền:</span>
                        <span className="text-red-500 font-semibold">{finalTotal.toLocaleString('vi-VN')}đ</span>
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
