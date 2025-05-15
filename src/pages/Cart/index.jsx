import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundCart from '~/components/BackgroundCart';
import MenuProduct from '~/components/MenuProduct';
import PopUpRemove from '~/components/PopUpRemove';
import ProductCart from '~/components/ProductCart';
import routes from '~/config/routes';
import { useStorage } from '~/Contexts';
import { DeleteCart, UpdateCartsOrder } from '~/services/Cart';
import { OrderProduct } from '~/services/Order';
import { CreatePaymentVnpay } from '~/services/Payment';

function Cart() {
    const navigate = useNavigate();
    const { userData, dataCart, setDataCart, checkedCart, setCheckedCart } = useStorage();
    const [checkProduct, setCheckProduct] = useState([]);
    const [chooseRemove, setChooseRemove] = useState({});
    console.log(dataCart);
    const uniqueCategories = useMemo(() => {
        const map = new Map();
        dataCart.forEach((item) => {
            map.set(item.category.id, item.category);
        });
        return [...map.values()];
    }, [dataCart]);

    const updateQuantity = useCallback((id, newQuantity) => {
        setDataCart((prevProducts) =>
            prevProducts.map((product) =>
                product.products.id === id
                    ? {
                          ...product,
                          products: {
                              ...product.products,
                              quantity: newQuantity,
                          },
                          total: newQuantity * product.products.price,
                      }
                    : product,
            ),
        );
        // eslint-disable-next-line
    }, []);

    const handleChangeCheckCart = async (e, category) => {
        const isChecked = e.target.checked;
        const cartsId = dataCart.filter((product) => product.category.id === category.id).map((product) => product.id);
        const resUpdateCart = await UpdateCartsOrder({ userId: userData.id, cartsId: cartsId });
        if (resUpdateCart) {
            setDataCart((prev) =>
                prev.map((product) =>
                    product.category.id === category.id ? { ...product, isSelectedForOrder: isChecked } : product,
                ),
            );
        }
    };

    const HandlePurchase = async () => {
        if (userData && Object.keys(userData).length > 0 && userData?.addresses?.length <= 0) {
            navigate(routes.userProfile);
        } else if (userData && Object.keys(userData).length > 0 && userData?.addresses?.length > 0) {
            navigate(routes.order);
        } else {
            navigate(routes.login);
        }
    };

    const handleRemoveCart = async (userId, idCart) => {
        await DeleteCart(userId, idCart);
        setChooseRemove({});
        setDataCart((prev) => prev.filter((product) => product.id !== idCart));
    };

    // const handlePay = async () => {
    //     try {
    //         console.log(userData);
    //         if (userData && Object.keys(userData).length > 0 && userData?.addresses?.length <= 0) {
    //             navigate(routes.userProfile);
    //         } else if (userData && Object.keys(userData).length > 0 && userData?.addresses?.length > 0) {
    //             const selectedProductIds = checkProduct
    //                 .filter((product) => product.check === true)
    //                 .map((product) => product.id);
    //             console.log(selectedProductIds);
    //             const res = await OrderProduct(userData?.id, { cartsId: selectedProductIds, paymentMethod: 'VnPay' });
    //             console.log(res.paymentUrl);
    //             if (res.paymentUrl) {
    //                 window.location.href = res.paymentUrl;
    //             }
    //             setDataCart((prevDataCart) =>
    //                 prevDataCart.filter((product) => !selectedProductIds.includes(product.id)),
    //             );
    //             setCheckProduct((prevDataCart) =>
    //                 prevDataCart.filter((product) => !selectedProductIds.includes(product.id)),
    //             );
    //         } else {
    //             navigate(routes.login);
    //         }
    //     } catch (err) {
    //         console.error('Payment error:', err);
    //     }
    // };

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
            {uniqueCategories.map((category) => (
                <div key={category.id} className="flex flex-col items-center bg-white mb-8">
                    <BackgroundCart className="w-full items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <input
                                checked={dataCart
                                    .filter((item) => item.category.id === category.id)
                                    .every((item) => item.isSelectedForOrder)}
                                onChange={(e) => handleChangeCheckCart(e, category)}
                                type="checkbox"
                                className="w-4 h-4 cursor-pointer"
                            />
                            <span className="text-[16px] font-medium">{category.name}</span>
                        </div>
                    </BackgroundCart>

                    {dataCart
                        .filter((item) => item.category.id === category.id)
                        .map((item) => (
                            <BackgroundCart key={item.id} className="w-full items-center">
                                <ProductCart
                                    product={item}
                                    onUpdateQuantity={updateQuantity}
                                    setChecked={setDataCart}
                                    setChooseRemove={setChooseRemove}
                                />
                            </BackgroundCart>
                        ))}
                </div>
            ))}

            <BackgroundCart className="w-full items-center justify-between mt-8 mb-12">
                <div className="flex items-center space-x-4">
                    <input type="checkbox" className="w-4 h-4 cursor-pointer" />
                    <span className="text-[16px] font-medium">
                        Chọn tất cả (
                        {dataCart.reduce(
                            (count, item) => (item.isSelectedForOrder === true ? count + item.product.quantity : count),
                            0,
                        )}{' '}
                        sản phẩm)
                    </span>
                    <button className="text-red-500 text-[16px] font-medium hover:underline">Xóa tất cả</button>
                </div>
                <div className="flex items-center text-[16px] font-medium">
                    <div className="flex items-center justify-center mr-4">
                        Tổng thanh toán (
                        <span className="mx-1">
                            {dataCart.reduce(
                                (count, item) =>
                                    item.isSelectedForOrder === true ? count + item.product.quantity : count,
                                0,
                            )}
                        </span>{' '}
                        sản phẩm)
                        <span className="text-red-500 ml-2">
                            {dataCart
                                .reduce(
                                    (count, item) =>
                                        item.isSelectedForOrder === true ? count + (item?.total || 0) : count,
                                    0,
                                )
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
                    {/* <button
                        onClick={handlePay}
                        className="px-8 py-2 bg-yellow-400 text-white text-sm font-bold rounded hover:bg-yellow-500"
                    >
                        Thanh toán
                    </button> */}
                </div>
            </BackgroundCart>

            <MenuProduct title={'Có thể bạn cũng thích'} />

            {Object.keys(chooseRemove).length > 0 && (
                <PopUpRemove
                    id={chooseRemove.id}
                    title={'Delete Product In Cart?'}
                    desc={`Are you sure you want to delete this product ${chooseRemove?.products.name}?`}
                    onRemove={() => handleRemoveCart(userData?.id, chooseRemove.id)}
                    onClose={() => setChooseRemove({})}
                    isRemove={Object.keys(chooseRemove).length > 0}
                />
            )}
        </div>
    );
}

export default Cart;
