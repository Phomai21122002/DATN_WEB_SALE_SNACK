import HeaderTable from '~/components/HeaderTabel';
import { listTitle, orderList } from './Constant';
// import BodyTabel from '~/components/BodyTabel';
import BackgroundCart from '~/components/BackgroundCart';
import { useEffect, useState } from 'react';
import { GetOrderByDate, GetProductSales, GetRevenueProducts, GetTotalRevenue } from '~/services/User';

function BoardRevenue() {
    const [totalRevenue, setTotalRevenue] = useState();
    const [productSalesCount, setProductSalesCount] = useState({});
    const [revenueProducts, setRevenueProducts] = useState([]);
    const [ordersCountByDate, setOrdersCountByDate] = useState({});

    useEffect(() => {
        const getData = async () => {
            // const resTotal = await GetTotalRevenue();
            // setTotalRevenue(resTotal.totalRevenue);
            // const resSales = await GetProductSales();
            // setProductSalesCount(resSales.productSales);
            // var resRevenueProduct = await GetRevenueProducts();
            // const formattedArray = Object.entries(resRevenueProduct).map(([name, price]) => {
            //     return { name: name.trim(), price: parseInt(price, 10) };
            // });
            // setRevenueProducts(formattedArray);
            // const resOrderCount = await GetOrderByDate();
            // setOrdersCountByDate(resOrderCount);
        };
        getData();
    }, []);
    // const editOrder = (id) => {
    //     console.log('Editing order', id);
    // };
    // const deleteOrder = (id) => {
    //     console.log('Deleting order', id);
    // };
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full text-left text-sm">
                <HeaderTable listTitle={listTitle} />
                <tbody>
                    {revenueProducts.map((order, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50 cursor-pointer">
                            <td className="py-3 px-6">{index + 1}</td>
                            <td className="py-3 px-6">{order.name}</td>
                            <td className="py-3 px-6">{order?.price?.toLocaleString()} VND</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {orderList.length === 0 && <div className="text-center py-6 text-gray-500">Không có đơn hàng nào</div>}
            <BackgroundCart className="flex flex-col w-full orders-end mt-8 mb-12">
                <div className="text-[16px] font-medium w-full max-w-md">
                    <div className="flex justify-between orders-center mb-4">
                        <span className="text-gray-700">Tổng sản phẩm đã bán:</span>
                        <span className="text-black-500 font-semibold">{productSalesCount?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between orders-center mb-4">
                        <span className="text-gray-700">Tổng doanh thu:</span>
                        <span className="text-red-500 font-semibold">{totalRevenue?.toLocaleString()}đ</span>
                    </div>
                </div>
            </BackgroundCart>
        </div>
    );
}

export default BoardRevenue;
