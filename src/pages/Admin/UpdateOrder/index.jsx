import { useEffect, useState } from 'react';
import BackgroundCart from '~/components/BackgroundCart';
import ProductOrder from '~/components/ProductOrder';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GetOrderById, UpdateOrderProduct } from '~/services/Order';
import routes from '~/config/routes';

function UpdateOrder() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const userId = searchParams.get('userId');
    const navigate = useNavigate();
    const [order, setOrder] = useState({});

    useEffect(() => {
        const getData = async () => {
            const res = await GetOrderById(id, userId);
            setOrder(res);
        };
        getData();
    }, [id, userId]);

    const handleBack = () => {
        switch (order?.status) {
            case 'Completed':
                navigate(routes.adminListBill);
                break;
            case 'Processing':
                navigate(routes.adminListConfirmOrder);
                break;
            default:
                navigate(routes.admin);
                break;
        }
    };

    const handleSubmit = async () => {
        switch (order?.status) {
            case 'Processing':
                await UpdateOrderProduct(id, {
                    userId: userId,
                    status: 2,
                });
                navigate(routes.adminListConfirmOrder);
                break;
            default:
                await UpdateOrderProduct(id, {
                    userId: userId,
                    status: 1,
                });
                navigate(routes.admin);
                break;
        }
    };
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="max-w-[1100px] mx-auto py-8">
                <BackgroundCart className={'items-center'}>
                    <div className="flex-grow text-sm text-gray-900 font-medium">Mã đơn hàng</div>
                    <div className="w-32 text-center text-sm text-gray-500 font-medium">Đơn giá</div>
                    <div className="w-32 text-center text-sm text-gray-500 font-medium">Số lượng</div>
                    <div className="w-32 text-center text-sm text-gray-500 font-medium">Số tiền</div>
                    <div className="w-32 text-center text-sm text-gray-500 font-medium">Ngày đặt hàng</div>
                </BackgroundCart>
                <div className="flex flex-col items-center bg-white">
                    <BackgroundCart className="w-full justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <span className="text-[16px] font-medium">{order.name}</span>
                            <span
                                className={`px-3 py-1 rounded-full text-xs ${
                                    order.status === 'Completed'
                                        ? 'bg-green-200 text-green-800'
                                        : order.status === 'Pending'
                                        ? 'bg-yellow-200 text-yellow-800'
                                        : 'bg-red-200 text-red-800'
                                }`}
                            >
                                {order.status}
                            </span>
                        </div>
                    </BackgroundCart>
                    <BackgroundCart className="w-full items-center">
                        <ProductOrder products={order?.orderProduct} date={order?.createdAt} />
                    </BackgroundCart>
                </div>
                <BackgroundCart className="flex flex-col w-full items-end mt-8 mb-12">
                    <div className="text-[16px] font-medium w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-700">
                                Tổng tiền hàng ({order?.orderProduct?.length || 0} sản phẩm):
                            </span>
                            <span className="text-black-500 font-semibold">{order?.total?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-700">Phí vận chuyển:</span>
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
                    {order?.status === 'Completed' || (
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
