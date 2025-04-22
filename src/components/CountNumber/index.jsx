import { memo } from 'react';
import { Add, Remove } from '@mui/icons-material';

function CountNumber({ onUpdateQuantity, quantity, product }) {
    const handleChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            onUpdateQuantity(product.id, Number(value) || 0);
        }
    };
    return (
        <div className="flex items-center ring-1 ring-gray-200 rounded-md">
            <button
                onClick={() => onUpdateQuantity(product.id, Math.max(1, product?.count - 1))}
                className="flex items-center justify-center w-[30px] p-2 h-full text-gray-700 p-1 rounded-md hover:bg-gray-200 transition-all"
            >
                <Remove sx={{ fontSize: '20px' }} />
            </button>
            <input type="text" value={quantity} onChange={handleChange} className="w-20 text-center text-[16px] p-1" />
            <button
                onClick={() => onUpdateQuantity(product.id, Math.max(1, product?.count + 1))}
                className="flex items-center justify-center w-[30px] p-2 h-full text-gray-700 p-1 rounded-md hover:bg-gray-200 transition-all"
            >
                <Add sx={{ fontSize: '20px' }} />
            </button>
        </div>
    );
}

export default memo(CountNumber);
