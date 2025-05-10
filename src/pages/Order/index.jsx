import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import BackgroundCart from '~/components/BackgroundCart';
import ProductOrder from '~/components/ProductOrder';
import routes from '~/config/routes';
import { useStorage } from '~/Contexts';
import { OrderProduct } from '~/services/Order';

function Order() {
    const { userData, dataCart } = useStorage();
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

    const handlePay = async () => {
        try {
            const res = await OrderProduct(userData?.id, { cartsId: selectedProductIds, paymentMethod: 'VnPay' });
            if (res.paymentUrl) {
                window.location.href = res.paymentUrl;
            }
        } catch (err) {
            console.error('Payment error:', err);
        }
    };
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
                <div className="text-[16px] font-medium w-full max-w-md">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-700">Tổng tiền hàng ({productsOrder.length} sản phẩm):</span>
                        <span className="text-black-500 font-semibold">
                            {' '}
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

// import { useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

// import BackgroundCart from '~/components/BackgroundCart';
// import { GetPaymentVnpay } from '~/services/Payment';

// function Order() {
//     const [params] = useSearchParams();
//     const [orderData, setOrderData] = useState(null);

//     useEffect(() => {
//         const fetchPaymentResult = async () => {
//             try {
//                 const res = await GetPaymentVnpay(params);
//                 console.log(res);
//                 setOrderData(res);
//             } catch (err) {
//                 console.error('Failed to fetch payment result', err);
//             }
//         };

//         fetchPaymentResult();
//     }, [params]);
//     console.log(orderData);
//     if (!orderData) return <div>Đang xử lý thanh toán...</div>;

//     return (
//         <div className="max-w-[1100px] mx-auto py-8 mt-[64px]">
//             <BackgroundCart className="flex-col justify-end">
//                 <div className="text-red-500">
//                     <AddLocationAltIcon style={{ fontSize: 20, marginRight: 8 }} />
//                     <span className="text-[20px] font-medium">Kết quả thanh toán</span>
//                 </div>
//                 <div className="flex items-center text-black-400 space-x-4">
//                     <div className="text-[16px] font-medium">
//                         {orderData.success ? 'Thanh toán thành công!' : 'Thanh toán thất bại'}
//                     </div>
//                     <div className="text-[16px] font-medium">{orderData.orderDescription}</div>
//                 </div>
//             </BackgroundCart>
//         </div>
//     );
// }

// export default Order;
