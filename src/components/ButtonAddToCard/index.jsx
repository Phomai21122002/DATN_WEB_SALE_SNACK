import { memo } from 'react';

function ButtonAddToCard({ onAdd, product, quantity }) {
    return (
        <button
            onClick={() => onAdd(product.id, quantity)}
            className="text-[12px] bg-transparent text-gray-700  py-1 px-2 mx-2 rounded-md transition-all bg-yellow-200 hover:bg-yellow-300"
        >
            Thêm vào giỏ
        </button>
    );
}

export default memo(ButtonAddToCard);
