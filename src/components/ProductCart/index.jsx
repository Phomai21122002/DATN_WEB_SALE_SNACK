import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import routes from '~/config/routes';
import QuantitySelector from '~/components/QuantitySelector';
import { useStorage } from '~/Contexts';
import { UpdateCartsOrder } from '~/services/Cart';

function ProductCart({ product, onUpdateQuantity, setChooseRemove }) {
    const { userData, dataCart, refetchListCart } = useStorage();
    const handleDelProduct = useCallback(() => {
        const cart = dataCart.find((cart) => cart.id === product.id);
        setChooseRemove(cart);
    }, [product.id, dataCart, setChooseRemove]);

    const handleCheckedProduct = useCallback(async () => {
        const res = await UpdateCartsOrder({ userId: userData.id, cartsId: [product.id] });
        if (res) await refetchListCart();
    }, [product.id, userData.id, refetchListCart]);

    return (
        <>
            <input
                checked={product.isSelectedForOrder}
                onChange={() => handleCheckedProduct(product.id)}
                type="checkbox"
                className="w-4 h-4 mr-4 cursor-pointer"
            />
            <Link
                to={routes.product.replace(':slug', product?.product.slug)}
                className="flex items-center flex-grow space-x-4 w-[20%]"
            >
                <img src={product?.product.urls[0]} alt="Sản phẩm" className="w-16 h-16 object-cover rounded" />
                <div className="text-sm font-medium">{product?.product.name}</div>
            </Link>
            <div className="w-32 text-center text-black text-sm font-medium">
                {Number(product?.product.price).toLocaleString('vi-VN', { currency: 'VND' })}₫
            </div>
            <div className="w-32 flex justify-center">
                <QuantitySelector
                    product={product.product}
                    quantity={product.product.count}
                    onUpdateQuantity={onUpdateQuantity}
                />
            </div>
            <div className="w-32 text-center text-sm text-red-500 font-medium">
                {Number(product?.total).toLocaleString('vi-VN', { currency: 'VND' })}₫
            </div>
            <div className="w-32 text-center font-medium leading-none">
                <button
                    onClick={() => handleDelProduct(product.id)}
                    className="text-black-900 text-sm hover:text-red-500"
                >
                    Xóa
                </button>
                <div className="flex items-center text-red-500 cursor-pointer">
                    <span className="text-[12px] leading-none">Tìm sản phẩm tương tự</span>
                    <ArrowDropDownIcon style={{ fontSize: 20 }} />
                </div>
            </div>
        </>
    );
}

export default memo(ProductCart);
