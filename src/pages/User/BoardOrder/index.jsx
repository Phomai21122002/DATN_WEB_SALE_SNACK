import { useEffect, useState } from 'react';
import { GetOrdersProduct } from '~/services/Order';
import BackgroundCart from '~/components/BackgroundCart';
import ProductOrder from '~/components/ProductOrder';
import { useStorage } from '~/Contexts';

function BoardOrder() {
    const { userData } = useStorage();
    const [orderList, setOrderList] = useState([]);
    const [totalOrderPrice, setTotalOrderPrice] = useState(0);

    useEffect(() => {
        const getData = async () => {
            if (Object.keys(userData).length > 0) {
                const res = await GetOrdersProduct(userData?.id);
                console.log(res);
                // setOrderList(res.filter((product) => product?.status !== 'Completed'));
                // setTotalOrderPrice(res?.reduce((sum, order) => sum + (order.total || 0), 0));
            }
        };
        getData();
    }, []);

    return (
        <div className="flex justify-center mt-24 pb-8 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="max-w-[1100px] mx-auto py-8">
                <BackgroundCart className={'items-center'}>
                    <div className="flex-grow text-sm text-gray-900 font-medium">Mã đơn hàng</div>
                    <div className="w-32 text-center text-sm text-gray-500 font-medium">Tên người dùng</div>
                    <div className="w-32 text-center text-sm text-gray-500 font-medium">Số điện thoại người dùng</div>
                    <div className="w-32 text-center text-sm text-gray-500 font-medium">Số lượng</div>
                    <div className="w-32 text-center text-sm text-gray-500 font-medium">Số tiền</div>
                    <div className="w-32 text-center text-sm text-gray-500 font-medium">Ngày đặt hàng</div>
                </BackgroundCart>
                {orderList?.map((item) => (
                    <div key={item.id} className="flex flex-col items-center bg-white">
                        <BackgroundCart className="w-full justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <span className="text-[16px] font-medium">{item.name}</span>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs ${
                                        item.status === 'Completed'
                                            ? 'bg-green-200 text-green-800'
                                            : item.status === 'Pending'
                                            ? 'bg-yellow-200 text-yellow-800'
                                            : 'bg-red-200 text-red-800'
                                    }`}
                                >
                                    {item.status}
                                </span>
                            </div>
                        </BackgroundCart>
                        <BackgroundCart className="w-full items-center">
                            <ProductOrder products={item?.orderProduct} date={item?.createdAt} />
                        </BackgroundCart>
                        <BackgroundCart className="flex flex-col w-full items-end mb-12">
                            <div className="text-[16px] font-medium w-full max-w-md">
                                <div className="flex justify-between items-center mb-8">
                                    <span className="text-gray-700">
                                        Tổng tiền hàng ({item.orderProduct.length} sản phẩm):
                                    </span>
                                    <span className="text-red-500 font-semibold">{item.total.toLocaleString()}đ</span>
                                </div>
                            </div>
                        </BackgroundCart>
                    </div>
                ))}
                <BackgroundCart className="flex flex-col w-full items-end mt-8 mb-12">
                    <div className="text-[16px] font-medium w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-700">Tổng tiền hàng ({orderList?.length || 0} sản phẩm):</span>
                            <span className="text-black-500 font-semibold">{totalOrderPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-700">Phí vận chuyển:</span>
                            <span className="text-black-500 font-semibold">30.000đ</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-700">Tổng thành tiền:</span>
                            <span className="text-red-500 font-semibold">
                                {(totalOrderPrice + 30000).toLocaleString()}đ
                            </span>
                        </div>
                    </div>
                </BackgroundCart>
            </div>
        </div>
    );
}

export default BoardOrder;
