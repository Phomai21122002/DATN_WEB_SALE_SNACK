import { memo, useCallback } from 'react';
import { Add, Remove } from '@mui/icons-material';

function QuantitySelector({ onUpdateQuantity, quantity, product }) {
    const handleChange = useCallback(
        (e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value) && Number(value) <= product?.quantity) {
                onUpdateQuantity(product.id, Number(value) || 0);
            }
        },
        [onUpdateQuantity, product],
    );

    const handleDecrease = () => onUpdateQuantity(product.id, Math.max(1, quantity - 1));
    const handleIncrease = () => onUpdateQuantity(product.id, Math.min(product?.quantity, quantity + 1));

    return (
        <div className="flex items-center ring-1 ring-gray-200 rounded-md">
            <button
                onClick={handleDecrease}
                className="flex items-center justify-center bg-gray-200 w-[20px] h-full text-gray-700 p-1 rounded-md hover:bg-gray-300 transition-all"
            >
                <Remove sx={{ fontSize: '16px' }} />
            </button>
            <input
                type="text"
                value={quantity}
                onChange={handleChange}
                className="w-10 text-center text-[12px] border border-gray-300 rounded-md"
            />
            <button
                onClick={handleIncrease}
                className="flex items-center justify-center bg-gray-200 w-[20px] h-full text-gray-700 p-1 rounded-md hover:bg-gray-300 transition-all"
            >
                <Add sx={{ fontSize: '16px' }} />
            </button>
        </div>
    );
}

export default memo(QuantitySelector);
