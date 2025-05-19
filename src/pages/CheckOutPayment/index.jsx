import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import BackgroundCart from '~/components/BackgroundCart';
import { GetPaymentMomo, GetPaymentVnpay } from '~/services/Payment';

function CheckOutPayment() {
    const [params] = useSearchParams();
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        const fetchPaymentResult = async () => {
            try {
                const partnerCode = params.get('partnerCode');
                if (partnerCode === 'MOMO') {
                    const res = await GetPaymentMomo(params);
                    setOrderData(res);
                } else {
                    const res = await GetPaymentVnpay(params);
                    setOrderData(res);
                }
            } catch (err) {
                console.error('Failed to fetch payment result', err);
            }
        };

        fetchPaymentResult();
    }, [params]);
    console.log(orderData);
    return (
        <div className="max-w-[1100px] mx-auto py-8 mt-[64px]">
            {orderData && (
                <div className="max-w-[1100px] mx-auto py-8">
                    <BackgroundCart className="flex-col justify-end">
                        <span className="text-green-500 text-[20px] font-medium">Kết quả thanh toán</span>
                        <div className="flex items-center text-black-400 space-x-4">
                            <div className="text-[16px] font-medium">
                                {orderData.success ? 'Thanh toán thành công!' : 'Thanh toán thất bại'}
                            </div>
                            <div className="text-[16px] font-medium">{orderData.orderDescription}</div>
                        </div>
                    </BackgroundCart>
                </div>
            )}
        </div>
    );
}

export default CheckOutPayment;
