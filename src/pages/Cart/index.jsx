import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundCart from '~/components/BackgroundCart';
import MenuProduct from '~/components/MenuProduct';
import ProductCart from '~/components/ProductCart';
import routes from '~/config/routes';
import { useStorage } from '~/Contexts';
import { OrderProduct } from '~/services/Order';
import { GetProfile } from '~/services/User';

function Cart() {
    const { userData, dataCart, setDataCart } = useStorage();
    const [checkProduct, setCheckProduct] = useState([]);
    const [profileUser, setProfileUser] = useState({});
    const uniqueCategories = useMemo(() => [...new Set(dataCart.map((item) => item.categoryName))], [dataCart]);
    const navigate = useNavigate();
    useEffect(() => {
        setCheckProduct(
            dataCart.map((product) => ({
                ...product,
                check: true,
            })),
        );

        const GetAddressUser = async () => {
            const res = await GetProfile();
            setProfileUser(res);
        };

        GetAddressUser();
    }, [dataCart]);

    const updateQuantity = (id, newQuantity) => {
        setDataCart((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id
                    ? { ...product, quantity: newQuantity, total: newQuantity * product.product.price }
                    : product,
            ),
        );
    };

    const HandlePurchase = async () => {
        if (profileUser?.addresses?.length <= 0 && !profileUser?.phoneNumber) {
            navigate(routes.userProfile);
        } else if (userData && Object.keys(userData).length > 0) {
            const selectedProductIds = checkProduct
                .filter((product) => product.check === true)
                .map((product) => product.id);
            await OrderProduct({ carts: selectedProductIds });
            setDataCart((prevDataCart) => prevDataCart.filter((product) => !selectedProductIds.includes(product.id)));
            setCheckProduct((prevDataCart) =>
                prevDataCart.filter((product) => !selectedProductIds.includes(product.id)),
            );
        } else {
            navigate(routes.login);
        }
    };

    return (
        <div className="max-w-[1100px] mx-auto py-8 mt-[64px]">
            <BackgroundCart className={'items-center'}>
                <input type="checkbox" className="w-4 h-4 mr-4 cursor-pointer" title="Chọn tất cả" />
                <div className="flex-grow text-sm text-gray-900 font-medium">Sản phẩm</div>
                <div className="w-32 text-center text-sm text-gray-500 font-medium">Đơn giá</div>
                <div className="w-32 text-center text-sm text-gray-500 font-medium">Số lượng</div>
                <div className="w-32 text-center text-sm text-gray-500 font-medium">Số tiền</div>
                <div className="w-32 text-center text-sm text-gray-500 font-medium">Thao tác</div>
            </BackgroundCart>
            {uniqueCategories.map((nameCategory) => (
                <div key={nameCategory} className="flex flex-col items-center bg-white mb-8">
                    <BackgroundCart className="w-full items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <input type="checkbox" className="w-4 h-4 cursor-pointer" />
                            <span className="text-[16px] font-medium">{nameCategory}</span>
                        </div>
                    </BackgroundCart>

                    {checkProduct
                        .filter((item) => item.categoryName === nameCategory)
                        .map((item) => (
                            <BackgroundCart key={item.id} className="w-full items-center">
                                <ProductCart
                                    product={item}
                                    onUpdateQuantity={updateQuantity}
                                    setChecked={setCheckProduct}
                                />
                            </BackgroundCart>
                        ))}
                </div>
            ))}

            <BackgroundCart className="w-full items-center justify-between mt-8 mb-12">
                <div className="flex items-center space-x-4">
                    <input type="checkbox" className="w-4 h-4 cursor-pointer" />
                    <span className="text-[16px] font-medium">
                        Chọn tất cả ({checkProduct.reduce((count, item) => count + item.quantity, 0)} sản phẩm)
                    </span>
                    <button className="text-red-500 text-[16px] font-medium hover:underline">Xóa tất cả</button>
                </div>
                <div className="flex items-center text-[16px] font-medium">
                    <div className="flex items-center justify-center mr-4">
                        Tổng thanh toán (
                        <span className="mx-1">{checkProduct.reduce((count, item) => count + item.quantity, 0)}</span>{' '}
                        sản phẩm)
                        <span className="text-red-500 ml-2">
                            {checkProduct
                                .reduce((count, item) => (item.check === true ? count + (item?.total || 0) : count), 0)
                                .toLocaleString()}
                            ₫
                        </span>
                    </div>
                    <button
                        onClick={HandlePurchase}
                        className="px-8 py-2 bg-yellow-400 text-white text-sm font-bold rounded hover:bg-yellow-500"
                    >
                        Mua hàng
                    </button>
                </div>
            </BackgroundCart>

            <MenuProduct title={'Có thể bạn cũng thích'} />
        </div>
    );
}

export default Cart;
