import { memo } from 'react';

import ButtonAddToCard from '../ButtonAddToCard';
import QuantitySelector from '../QuantitySelector';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';

function Product({ product, updateQuantity, addToCart }) {
    const firstImageUrl = product.urls && product.urls.length > 0 ? product.urls[0] : 'default-image-url.jpg';
    return (
        <div
            key={product.id}
            className="group bg-white pb-2 rounded-md shadow-md hover:outline-none hover:ring-2 hover:ring-blue-500 transition-all"
        >
            <Link to={`${routes.product.replace('/:slug', '')}/${product.slug}`}>
                <div className="relative w-full h-[150px] overflow-hidden cursor-pointer rounded-tr-md rounded-tl-md">
                    <img
                        src={firstImageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover transform transition-all duration-300 group-hover:scale-105"
                    />
                </div>
            </Link>

            <div className="px-2">
                <Link to={`${routes.product.replace('/:slug', '')}/${product.slug}`}>
                    <div className="h-[86px] mb-2">
                        <h3 className="my-2 text-[16px] font-semibold cursor-pointer line-clamp-2">{product.name}</h3>
                        <p className="text-sm text-gray-600 cursor-pointer line-clamp-2">{product.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-lg my-2 text-red-600">{product.price} đ</p>
                        <p className="text-[12px] my-2 text-gray-600">còn {product.quantity} sp</p>
                    </div>
                </Link>

                <div className="flex items-center justify-between mt-2">
                    <QuantitySelector product={product} quantity={product?.count} onUpdateQuantity={updateQuantity} />
                    <ButtonAddToCard onAdd={addToCart} product={product} quantity={product?.count} />
                </div>
            </div>
        </div>
    );
}

export default memo(Product);
