import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import routes from '~/config/routes';
import { useStorage } from '~/Contexts';
import { GetPaymentMomo, GetPaymentVnpay } from '~/services/Payment';

function CheckOutPayment() {
    const [params] = useSearchParams();
    const { refetchListCart } = useStorage();

    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        const fetchPaymentResult = async () => {
            try {
                const partnerCode = params.get('partnerCode');
                const res = partnerCode === 'MOMO' ? await GetPaymentMomo(params) : await GetPaymentVnpay(params);
                setOrderData(res);
                await refetchListCart();
            } catch (err) {
                console.error('Failed to fetch payment result', err);
            }
        };

        fetchPaymentResult();
    }, [params, refetchListCart]);
    console.log(orderData);
    const isSuccess = useMemo(() => orderData?.success, [orderData]);

    return (
        <div className="max-w-[1100px] mx-auto py-8 mt-[64px]">
            {orderData && (
                <div className="p-6 rounded-2xl shadow-lg border bg-white">
                    <h2 className={`text-2xl text-center font-semibold mb-4`}>
                        Kết quả thông tin giao dịch thanh toán
                    </h2>
                    <h2 className={`text-2xl font-semibold mb-4 ${isSuccess ? 'text-green-600' : 'text-red-500'}`}>
                        {isSuccess ? 'Thanh toán thành công!' : 'Thanh toán thất bại'}
                    </h2>
                    <div className="space-y-3">
                        <div className="flex justify-between border-b pb-2">
                            <span className="font-medium text-xl text-gray-600">Mã đơn hàng:</span>
                            <span className={`text-xl ${isSuccess ? 'text-green-600' : 'text-red-500'}`}>
                                {orderData?.orderId || 'Không có'}
                            </span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="font-medium text-xl text-gray-600">Mô tả đơn hàng:</span>
                            <span className={`text-xl ${isSuccess ? 'text-green-600' : 'text-red-500'}`}>
                                {orderData?.orderDescription || 'Không có'}
                            </span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="font-medium text-xl text-gray-600">Tổng tiền:</span>
                            <span className={`text-xl ${isSuccess ? 'text-green-600' : 'text-red-500'}`}>
                                {orderData?.amount ? `${orderData?.amount.toLocaleString()} đ` : 'Không xác định'}
                            </span>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Link to={routes.userListOrder} className="text-blue-500 text-2xl hover:underline">
                            → Xem lịch sử đơn hàng đã đặt
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CheckOutPayment;
