import { Chart } from 'react-google-charts';

import { transformToChartData } from './Constant';
import { useEffect, useState } from 'react';
import StatCardDashBoard from '~/components/StatCardDashBoard';
import { GetProductsTop, GetStatistic, GetStatisticRevenue, GetTotalSoldProductOfCategory } from '~/services/Statistic';
import routes from '~/config/routes';
import { useNavigate } from 'react-router-dom';

function BoardRevenue() {
    const [statistic, setStatistic] = useState({});
    const [productsTop, setProductsTop] = useState([]);
    const [revenueMonths, setRevenueMonths] = useState([]);
    const [totalSoldProduct, setTotalSoldProduct] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const res = await GetStatistic();
            setStatistic(res);
            const resProductsTop = await GetProductsTop();
            setProductsTop(resProductsTop);
            const resRevenue = await GetStatisticRevenue();
            setRevenueMonths(resRevenue);
            const resTotalSoldProductInCategory = await GetTotalSoldProductOfCategory();
            setTotalSoldProduct(transformToChartData(resTotalSoldProductInCategory));
        };
        getData();
    }, []);

    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const filteredData = revenueMonths.filter((d) => d.year === selectedYear);
    const revenueByMonth = months.map((m) => {
        const monthData = filteredData.find((d) => d.month === m);
        return monthData ? monthData.totalRevenue : 0;
    });
    const years = [...new Set(revenueMonths.map((d) => d.year))].sort();

    const colors = [
        '#4e79a7',
        '#f28e2c',
        '#e15759',
        '#76b7b2',
        '#59a14f',
        '#edc949',
        '#af7aa1',
        '#ff9da7',
        '#9c755f',
        '#bab0ab',
        '#86bcbd',
        '#beaed4',
    ];
    const options = {
        hAxis: {
            title: 'Tháng',
        },
        vAxis: {
            title: 'Doanh thu (VNĐ)',
        },
    };
    const dataColumnChart = [
        ['Tháng', 'Doanh thu', { role: 'style' }],
        ...months.map((m, i) => [m.toString(), revenueByMonth[i], colors[i]]),
    ];
    const handleShowProductTop = (product) => {
        navigate(routes.adminUpdateProduct.replace(':slug', product.slug));
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-100 rounded-2xl shadow-lg">
                <div className="flex-1 bg-white rounded-xl shadow p-4">
                    <div className="flex items-center justify-center mt-4 text-lg">
                        <h2 className="font-semibold text-center mr-2">Biểu đồ doanh thu năm</h2>
                        <select value={selectedYear || ''} onChange={(e) => setSelectedYear(Number(e.target.value))}>
                            {years.length > 0 ? (
                                years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))
                            ) : (
                                <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                            )}
                        </select>
                    </div>
                    {selectedYear && (
                        <Chart
                            chartType="ColumnChart"
                            width="100%"
                            height="460px"
                            data={dataColumnChart}
                            options={options}
                        />
                    )}
                </div>
                <div className="flex-1 bg-white rounded-xl shadow p-4">
                    <h2 className="text-lg font-semibold mb-4 text-center">Top sản phẩm bán chạy</h2>
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                        {productsTop &&
                            productsTop.map((product, index) => (
                                <div
                                    key={product.id}
                                    onClick={() => handleShowProductTop(product)}
                                    className="flex items-center cursor-pointer gap-4 p-4 border rounded-lg hover:shadow transition-all bg-gray-50"
                                >
                                    <img
                                        src={product.urls[0]}
                                        alt={product.name}
                                        className="w-20 h-20 object-cover rounded-md"
                                    />

                                    <div className="flex-1">
                                        <h3 className="text-base font-semibold text-gray-800">
                                            {index + 1}. {product.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">{product.category.name}</p>
                                        <p className="text-sm text-gray-700 mt-1">
                                            Đã bán: <strong>{product.sold}</strong>
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            Giá: <strong>{product.price.toLocaleString()}₫</strong> | Doanh thu:{' '}
                                            <strong>{(product.price * product.sold).toLocaleString()}₫</strong>
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-4 my-4 bg-gray-200 px-4 py-6 w-full">
                <div className="col-span-12 md:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    <StatCardDashBoard label="Total Users" value={statistic?.totalUsers} type="users" />
                    <StatCardDashBoard label="Total Orders" value={statistic?.totalOrders} type="orders" />
                    <StatCardDashBoard label="Total Products" value={statistic?.totalProducts} type="products" />
                    <StatCardDashBoard label="Total Categories" value={statistic?.totalCategories} type="categories" />
                </div>
                <div className="col-span-12 md:col-span-4">
                    <StatCardDashBoard
                        label="Total Sales"
                        value={statistic?.totalSales}
                        type="sales"
                        className={'h-full'}
                    >
                        <Chart
                            chartType="PieChart"
                            width="100%"
                            height="220px"
                            data={totalSoldProduct}
                            options={options}
                        />
                    </StatCardDashBoard>
                </div>
            </div>
        </div>
    );
}

export default BoardRevenue;
