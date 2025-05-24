import { Person, ShoppingCart, ShoppingBag, Star, MonetizationOn } from '@mui/icons-material';

const iconMap = {
    users: <Person className="text-white" />,
    orders: <ShoppingCart className="text-white" />,
    products: <ShoppingBag className="text-white" />,
    categories: <Star className="text-white" />,
    sales: <MonetizationOn className="text-white" />,
};

const bgMap = {
    users: 'bg-green-500',
    orders: 'bg-pink-500',
    products: 'bg-blue-400',
    categories: 'bg-yellow-500',
    sales: 'bg-blue-600',
};

const StatCardDashBoard = ({ label, value, growth, type, className, children }) => {
    return (
        <div className={`rounded-xl p-4 shadow-lg text-white ${bgMap[type]} w-full ${className || 'h-[160px]'}`}>
            <div className="flex justify-between items-center">
                <div className="flex flex-col space-y-1">
                    <span className="text-sm font-medium">{label}</span>
                    <span className="text-2xl font-bold">
                        {type === 'sales' ? `$${value.toLocaleString()}` : value}
                    </span>
                    <span className="text-xs">
                        <span className="font-semibold text-white">+{growth}%</span> Last Month
                    </span>
                </div>
                <div className="bg-white/20 py-1 px-2 rounded-lg">{iconMap[type]}</div>
            </div>
            {children}
        </div>
    );
};

export default StatCardDashBoard;
