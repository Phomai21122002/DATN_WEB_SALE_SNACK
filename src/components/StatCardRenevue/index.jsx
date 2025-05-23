import { BarChart } from '@mui/icons-material';
import PieChartIcon from '@mui/icons-material/PieChart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import InventoryIcon from '@mui/icons-material/Inventory';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

const icons = {
    orders: <CardGiftcardIcon className="text-blue-500" fontSize="large" />,
    sales: <PieChartIcon className="text-green-500" fontSize="large" />,
    revenue: <AccountBalanceIcon className="text-purple-500" fontSize="large" />,
    products: <InventoryIcon className="text-indigo-500" fontSize="large" />,
};

const StatCardRenevue = ({ type, title, value }) => {
    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md w-full max-w-xs">
            <div className="flex items-center space-x-2">
                <div>{icons[type]}</div>
                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <p className="text-lg font-semibold">{value}</p>
                </div>
            </div>
            <BarChart className="text-gray-400" />
        </div>
    );
};

export default StatCardRenevue;
