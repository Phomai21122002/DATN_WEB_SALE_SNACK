import { memo } from 'react';
import { Link } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import routes from '~/config/routes';
import QuantitySelector from '~/components/QuantitySelector';
import { DeleteCart } from '~/services/Cart';
import { useStorage } from '~/Contexts';

function ProductCart({ product, onUpdateQuantity, setChecked }) {
    const { setDataCart } = useStorage();

    const handleDelProduct = async (idCart) => {
        await DeleteCart(idCart);
        setDataCart((prev) => prev.filter((product) => product.id !== idCart));
    };

    const handleCheckedProduct = async (idProduct) => {
        setChecked((prev) =>
            prev.map((product) => {
                if (product.id === idProduct) {
                    return {
                        ...product,
                        check: !product?.check,
                    };
                }
                return product;
            }),
        );
    };
    return (
        <>
            <input
                checked={product.check}
                onChange={() => handleCheckedProduct(product.id)}
                type="checkbox"
                className="w-4 h-4 mr-4 cursor-pointer"
            />
            <Link
                to={routes.product.replace(':slug', product?.product.slug)}
                className="flex items-center flex-grow space-x-4 w-[20%]"
            >
                <img src={product?.listImage[0].url} alt="Sản phẩm" className="w-16 h-16 object-cover rounded" />
                <div className="text-sm font-medium">{product?.product.name}</div>
            </Link>
            <div className="w-32 text-center text-black text-sm font-medium">
                {product?.product.price.toLocaleString()}₫
            </div>
            <div className="w-32 flex justify-center">
                <QuantitySelector product={product} quantity={product.quantity} onUpdateQuantity={onUpdateQuantity} />
            </div>
            <div className="w-32 text-center text-sm text-red-500 font-medium">{product?.total.toLocaleString()}₫</div>
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
