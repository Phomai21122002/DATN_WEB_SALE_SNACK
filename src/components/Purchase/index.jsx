import { memo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import routes from '~/config/routes';
import NoImage from '~/assets/images/No-image.png';
import BackgroundCart from '../BackgroundCart';
import Button from '../Button';
import { getOrderStatusStyleText, getOrderStatusText } from '../BodyTabel/Constant';
import { AddCart } from '~/services/Cart';
import { useStorage } from '~/Contexts';
import { useQueryClient } from '@tanstack/react-query';
import { EQueryKeys } from '~/constants';
import { RemoveProductOrder } from '~/services/Product';
import PopUpRemove from '../PopUpRemove';

function Purchase({ product, refetch, date = null }) {
    const queryClient = useQueryClient();
    const { userData } = useStorage();
    const navigate = useNavigate();
    const [chooseRemove, setChooseRemove] = useState({});
    const handlePurchaseAgain = async () => {
        if (userData && Object.keys(userData).length > 0 && product.product) {
            const res = await AddCart({
                quantity: product?.product?.quantity,
                userId: userData?.id,
                productId: product?.product?.id,
            });
            res &&
                queryClient.invalidateQueries({
                    queryKey: [EQueryKeys.GET_LIST_CART, userData?.id],
                });
            navigate(routes.cart);
        } else {
            navigate(routes.login);
        }
    };

    const RemoveProduct = async () => {
        try {
            if (userData && Object.keys(userData).length > 0 && product.product) {
                await RemoveProductOrder({
                    userId: userData?.id,
                    orderId: product.id,
                    productId: product?.product.id,
                });
                await refetch();
                setChooseRemove({});
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full mb-16 shadow-lg rounded-lg overflow-hidden">
            <div className="flex flex-col pt-4 px-8 text-lg font-medium text-gray-700 bg-[#fffefb]">
                <div className="flex items-center py-2 justify-between border-b border-gray-200">
                    <ul className="text-lg font-medium">
                        <li className="">
                            {product?.product?.category.name} ({product?.name})
                        </li>
                    </ul>
                    {product?.product?.status !== undefined && (
                        <div className={`uppercase ${getOrderStatusStyleText(product?.product.status)}`}>
                            {getOrderStatusText(product?.product.status)}
                        </div>
                    )}
                </div>
                <Link
                    to={routes.home}
                    className="flex w-full items-center py-4 border-b border-gray-200 justify-between"
                >
                    <div className="flex items-center gap-4 w-2/3">
                        <img
                            src={product?.product?.urls?.[0] || NoImage}
                            alt="Sản phẩm"
                            className="w-24 h-24 object-cover rounded border flex-shrink-0"
                        />
                        <div>
                            <div className="font-medium text-gray-800">{product?.product?.name}</div>
                            <div className="text-sm text-gray-500">x{product?.product?.quantity}</div>
                        </div>
                    </div>

                    <div className="text-right text-red-500 font-semibold w-1/3 whitespace-nowrap">
                        {product?.product?.price.toLocaleString()}đ
                    </div>
                </Link>
            </div>
            <BackgroundCart className="flex flex-col w-full items-end mb-12 mt-4">
                <div className="w-full max-w-md ">
                    <div className="flex items-center justify-end gap-x-4 mb-4 text-[20px] font-semibold text-gray-700">
                        <span>Thành tiền:</span>
                        <span className="text-red-500">
                            {(product?.product?.quantity * product?.product?.price).toLocaleString()}đ
                        </span>
                    </div>
                    {product?.product?.status === 1 || product?.product?.status === 2 ? (
                        <div className="flex justify-end">
                            <Button
                                handle={handlePurchaseAgain}
                                classNameButton={'bg-yellow-400 hover:bg-yellow-500 text-white ml-4'}
                                title="Mua Lại"
                            />
                            <Button
                                handle={() => setChooseRemove(product)}
                                classNameButton={'bg-red-400 hover:bg-red-500 text-white ml-4'}
                                title="Hủy"
                            />
                        </div>
                    ) : (
                        <div className="flex justify-end">
                            <Button
                                handle={handlePurchaseAgain}
                                classNameButton={'bg-yellow-400 hover:bg-yellow-500 text-white ml-4'}
                                title="Mua Lại"
                            />
                        </div>
                    )}
                </div>
            </BackgroundCart>
            {chooseRemove && (
                <PopUpRemove
                    id={chooseRemove.id}
                    title={'Xóa sản phẩm trong đơn hàng?'}
                    desc={`Bạn có chắc chắn là muốn xóa sản phẩm ${chooseRemove?.product?.name} trong đơn hàng ${chooseRemove?.name} này không?`}
                    onRemove={() => RemoveProduct()}
                    onClose={() => setChooseRemove({})}
                    isRemove={Object.keys(chooseRemove).length > 0}
                />
            )}
        </div>
    );
}

export default memo(Purchase);
