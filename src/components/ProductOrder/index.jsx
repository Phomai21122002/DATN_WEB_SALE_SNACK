import { memo } from 'react';
import { Link } from 'react-router-dom';

import routes from '~/config/routes';
import NoImage from '~/assets/images/No-image.png';

function ProductOrder({ products, date = null }) {
    return (
        <div className="w-full">
            {products?.map((product, index) => (
                <div className="flex items-center mb-8" key={index}>
                    <Link to={routes.home} className="flex items-center flex-grow space-x-4 w-[20%]">
                        <img
                            src={product?.urls?.[0] || NoImage}
                            alt="Sản phẩm"
                            className="w-16 h-16 object-cover rounded"
                        />
                        <div className="text-sm font-medium">{product?.name}</div>
                    </Link>
                    <div className="w-32 text-center text-black-500 text-sm font-medium">
                        {product?.price.toLocaleString()}đ
                    </div>
                    <div className="w-32 text-center text-black-500 text-sm font-medium">{product?.quantity}</div>
                    <div className="w-32 flex justify-center text-black-500 text-sm font-medium">
                        {(product?.quantity * product?.price).toLocaleString()}đ
                    </div>
                    <div className="w-32 text-center text-sm font-medium">{date?.slice(0, 10)}</div>
                </div>
            ))}
        </div>
    );
}

export default memo(ProductOrder);
