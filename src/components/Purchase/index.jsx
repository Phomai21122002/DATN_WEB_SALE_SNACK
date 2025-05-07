import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import routes from '~/config/routes';
import NoImage from '~/assets/images/No-image.png';
import BackgroundCart from '../BackgroundCart';
import Button from '../Button';
import { getOrderStatusStyleText, getOrderStatusText } from '../BodyTabel/Constant';
import { AddCart } from '~/services/Cart';
import { useStorage } from '~/Contexts';

function Purchase({ product, date = null }) {
    const { userData, getDataCartNow } = useStorage();
    const navigate = useNavigate();

    const handlePurchaseAgain = async () => {
        if (userData && Object.keys(userData).length > 0 && product) {
            const res = await AddCart({
                quantity: product?.quantity,
                userId: userData?.id,
                productId: product?.id,
            });
            res && getDataCartNow();
            navigate(routes.cart);
        } else {
            navigate(routes.login);
        }
    };

    return (
        <div className="w-full mb-16 shadow-lg rounded-lg overflow-hidden">
            <div className="flex flex-col pt-4 px-8 text-lg font-medium text-gray-700 bg-[#fffefb]">
                <div className="flex items-center py-2 justify-between border-b border-gray-200">
                    <ul className="text-lg font-medium">
                        <li className="">{product?.category.name}</li>
                    </ul>
                    <div className={`uppercase ${getOrderStatusStyleText(product.status)}`}>
                        {getOrderStatusText(product.status)}
                    </div>
                </div>
                <Link
                    to={routes.home}
                    className="flex w-full items-center py-4 border-b border-gray-200 justify-between"
                >
                    <div className="flex items-center gap-4 w-2/3">
                        <img
                            src={product?.urls?.[0] || NoImage}
                            alt="Sản phẩm"
                            className="w-24 h-24 object-cover rounded border flex-shrink-0"
                        />
                        <div>
                            <div className="font-medium text-gray-800">{product?.name}</div>
                            <div className="text-sm text-gray-500">x{product?.quantity}</div>
                        </div>
                    </div>

                    <div className="text-right text-red-500 font-semibold w-1/3 whitespace-nowrap">
                        {product?.price.toLocaleString()}đ
                    </div>
                </Link>
            </div>
            <BackgroundCart className="flex flex-col w-full items-end mb-12 mt-4">
                <div className="w-full max-w-md ">
                    <div className="flex items-center justify-end gap-x-4 mb-4 text-[20px] font-semibold text-gray-700">
                        <span>Thành tiền:</span>
                        <span className="text-red-500">{(product?.quantity * product?.price).toLocaleString()}đ</span>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            handle={handlePurchaseAgain}
                            classNameButton={'bg-red-400 hover:bg-red-500 text-white'}
                            title="Mua Lại"
                        />
                    </div>
                </div>
            </BackgroundCart>
        </div>
    );
}

export default memo(Purchase);
