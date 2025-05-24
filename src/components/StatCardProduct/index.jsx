import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PendingIcon from '@mui/icons-material/Pending';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
const ICONS = {
    product: <ShoppingBagIcon sx={{ fontSize: 64 }} className="text-white opacity-90 absolute right-2 top-[-24px]" />,
    category: <CategoryIcon sx={{ fontSize: 64 }} className="text-white opacity-90 absolute right-2 top-[-24px]" />,
    brand: <LocalOfferIcon sx={{ fontSize: 64 }} className="text-white opacity-90 absolute right-2 top-[-20px]" />,
    pending: <PendingIcon sx={{ fontSize: 48 }} className="text-white opacity-90 absolute right-2 top-[-20px]" />,
    shipped: <LocalShippingIcon sx={{ fontSize: 48 }} className="text-white opacity-90 absolute right-2 top-[-20px]" />,
    recieved: <ShoppingBagIcon sx={{ fontSize: 48 }} className="text-white opacity-90 absolute right-2 top-[-20px]" />,
    cancelled: <DoDisturbOnIcon sx={{ fontSize: 48 }} className="text-white opacity-90 absolute right-2 top-[-20px]" />,
};

const StatCardProduct = ({ type, label, value }) => {
    const bgColors = {
        product: 'bg-blue-500',
        category: 'bg-green-500',
        brand: 'bg-pink-500',
        pending: 'bg-pink-500',
        shipped: 'bg-blue-500',
        recieved: 'bg-green-500',
        cancelled: 'bg-red-500',
    };

    return (
        <div className={`relative overflow-visible text-white rounded-lg p-6 shadow-md ${bgColors[type]} w-full`}>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-sm mt-1">{label}</div>
            {ICONS[type]}
        </div>
    );
};

export default StatCardProduct;
