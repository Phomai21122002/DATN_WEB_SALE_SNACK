import { useEffect, useState } from 'react';
import BackgroundCart from '~/components/BackgroundCart';
import ProductOrder from '~/components/ProductOrder';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { GetOrderById, UpdateOrderProduct } from '~/services/Order';
import routes from '~/config/routes';
import { getOrderStatusStyle, getOrderStatusText } from '~/components/BodyTabel/Constant';

function UpdateOrder() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const userId = searchParams.get('userId');
    const navigate = useNavigate();
    const [order, setOrder] = useState({});

    useEffect(() => {
        const getData = async () => {
            console.log(userId);
            const res = await GetOrderById(id, userId);
            console.log(res);
            setOrder(res);
        };
        getData();
    }, [id, userId]);

    const handleBack = () => {
        switch (order?.status) {
            case 3:
                navigate(routes.adminListBill);
                break;
            case 2:
                navigate(routes.adminListConfirmOrder);
                break;
            case 4:
                navigate(routes.adminListCancelOrder);
                break;
            default:
                navigate(routes.admin);
                break;
        }
    };

    const handleSubmit = async () => {
        switch (order?.status) {
            case 1:
                await UpdateOrderProduct(id, userId);
                navigate(routes.adminListConfirmOrder);
                break;
            case 2:
                await UpdateOrderProduct(id, userId);
                navigate(routes.adminListConfirmOrder);
                break;
            default:
                navigate(routes.admin);
                break;
        }
    };
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="max-w-[1100px] mx-auto py-8">
                <BackgroundCart className={'items-center'}>
                    <div className="flex-grow text-sm text-gray-900 font-medium">Hình ảnh</div>
                    <div className="w-32 text-center text-sm text-gray-500 font-medium">Tên sản phẩm</div>
                    <div className="w-32 text-center text-sm text-gray-500 font-medium">Giá</div>
                    <div className="w-32 text-center text-sm text-gray-500 font-medium">Số lượng</div>
                    <div className="w-32 text-center text-sm text-gray-500 font-medium">Số tiền</div>
                    <div className="w-32 text-center text-sm text-gray-500 font-medium">Ngày đặt hàng</div>
                </BackgroundCart>
                <div className="flex flex-col items-center bg-white">
                    <BackgroundCart className="w-full justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <span className="text-[16px] font-medium">{order.name}</span>
                            <span className={`px-3 py-1 rounded-full text-xs ${getOrderStatusStyle(order.status)}`}>
                                {getOrderStatusText(order.status)}
                            </span>
                        </div>
                    </BackgroundCart>
                    <BackgroundCart className="w-full items-center">
                        <ProductOrder products={order?.products} date={order?.createOrder} />
                    </BackgroundCart>
                </div>
                <BackgroundCart className="flex gap-16 w-full items-end mt-8 mb-12">
                    <div className="text-[16px] font-medium w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-700">Tên người mua:</span>
                            <span className="text-black-500 font-semibold">
                                {order?.user?.firstName + ' ' + order?.user?.lastName}
                            </span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-700">Địa chỉ:</span>
                            <span className="text-black-500 font-semibold">
                                {order?.user?.addresses?.find((address) => address?.isDefault && address)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-700">Số điện thoại:</span>
                            <span className="text-red-500 font-semibold">{order?.user?.phone}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-700">Thanh toán:</span>
                            <span className="text-green-500 font-semibold">Đã thanh toán</span>
                        </div>
                    </div>
                    <div className="text-[16px] font-medium w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-700">Tổng tiền hàng ({order?.countProduct || 0} sản phẩm):</span>
                            <span className="text-black-500 font-semibold">{order?.total?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-700">Phí vận chuyển (khu vực nội thành):</span>
                            <span className="text-black-500 font-semibold">30.000đ</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-700">Tổng thành tiền:</span>
                            <span className="text-red-500 font-semibold">
                                {(order?.total + 30000).toLocaleString()}đ
                            </span>
                        </div>
                    </div>
                </BackgroundCart>
                <div className="flex justify-between gap-4">
                    {order?.status === 3 || (
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="bg-blue-500 text-sm text-white p-2 mx-4 rounded-md hover:bg-blue-600"
                        >
                            Xác nhận đơn hàng
                        </button>
                    )}
                    <button
                        type="button"
                        className="bg-gray-500 text-sm text-white p-2 mx-4 rounded-md hover:bg-gray-600"
                        onClick={handleBack}
                    >
                        Quay lại
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdateOrder;
