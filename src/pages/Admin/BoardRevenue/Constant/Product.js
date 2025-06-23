export const dataChart = [
    ['Category', 'Units Sold'],
    ['Work', 9],
    ['Eat', 2],
    ['Commute', 2],
    ['Watch TV', 2],
    ['Sleep', 7],
];

export function transformToChartData(data, topN = 5) {
    const filtered = data.filter((item) => item.sold > 0);
    const sorted = filtered.sort((a, b) => b.sold - a.sold);
    const topItems = sorted.slice(0, topN);
    const otherSold = sorted.slice(topN).reduce((sum, item) => sum + item.sold, 0);
    const chartData = [['Category', 'Units Sold']];
    topItems.forEach((item) => {
        chartData.push([item.name, item.sold]);
    });
    if (otherSold > 0) {
        chartData.push(['Khác', otherSold]);
    }
    return chartData;
}

export const options = {
    title: 'Best-Seller Rankings by Product Category',
    backgroundColor: 'transparent',
    chartArea: { width: '100%', Height: '100%' },
};

export const listTitle = ['STT', 'Tên sản phẩm', 'Tổng tiền'];
