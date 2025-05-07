import { memo } from 'react';
import { Link } from 'react-router-dom';

import routes from '~/config/routes';
import NoImage from '~/assets/images/No-image.png';

function ProductOrder({ products, date = null }) {
    return (
        <div className="w-full">
            {products?.map((product, index) => (
                <div
                    key={index}
                    className="flex items-center border-b border-gray-200 py-4 text-sm font-medium text-gray-700"
                >
                    <Link to={routes.home} className="flex items-center w-1/5">
                        <img
                            src={product?.urls?.[0] || NoImage}
                            alt="Sản phẩm"
                            className="w-24 h-24 object-cover rounded border"
                        />
                    </Link>
                    <Link to={routes.home} className="w-1/5">
                        <div className="w-full text-center">{product?.name}</div>
                    </Link>

                    <div className="w-1/5 text-center">{product?.price.toLocaleString()}đ</div>
                    <div className="w-1/5 text-center">{product?.quantity}</div>
                    <div className="w-1/5 text-center">{(product?.quantity * product?.price).toLocaleString()}đ</div>
                    <div className="w-1/5 text-center">{new Date(date).toLocaleString()}</div>
                </div>
            ))}
        </div>
    );
}

export default memo(ProductOrder);
