import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundCart from '~/components/BackgroundCart';
import MenuProduct from '~/components/MenuProduct';
import PopUpRemove from '~/components/PopUpRemove';
import ProductCart from '~/components/ProductCart';
import routes from '~/config/routes';
import { useStorage } from '~/Contexts';
import { DeleteCart, UpdateCart, UpdateCartsOrder } from '~/services/Cart';

function Cart() {
    const navigate = useNavigate();
    const { userData, dataCart, refetchListCart } = useStorage();
    const [chooseRemove, setChooseRemove] = useState({});

    const uniqueCategories = useMemo(() => {
        const map = new Map();
        dataCart &&
            dataCart?.forEach((item) => {
                map.set(item.category.id, item.category);
            });
        return [...map.values()];
    }, [dataCart]);

    const updateQuantity = useCallback(async (id, newQuantity) => {
        if (!dataCart || !Array.isArray(dataCart)) return;
        const cart = dataCart.find((cart) => cart?.product?.id === id);
        if (!cart) return;
        const resUpdateCart = await UpdateCart({
            userId: userData.id,
            quantity: newQuantity,
            isSelectedForOrder: true,
            cartId: cart.id,
        });
        resUpdateCart && (await refetchListCart());
        // eslint-disable-next-line
    }, []);

    const handleChangeCheckCart = async (e, category) => {
        const cartsId = dataCart.filter((product) => product.category.id === category.id).map((product) => product.id);
        const resUpdateCart = await UpdateCartsOrder({ userId: userData.id, cartsId: cartsId });
        resUpdateCart && (await refetchListCart());
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
        try {
            await DeleteCart(userId, idCart);
            await refetchListCart();
            setChooseRemove({});
        } catch (error) {
            console.log(error);
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
                        {dataCart &&
                            dataCart.reduce(
                                (count, item) =>
                                    item.isSelectedForOrder === true ? count + item.product.count : count,
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
                            {dataCart &&
                                dataCart.reduce(
                                    (count, item) =>
                                        item.isSelectedForOrder === true ? count + item.product.count : count,
                                    0,
                                )}
                        </span>{' '}
                        sản phẩm)
                        <span className="text-red-500 ml-2">
                            {dataCart &&
                                dataCart
                                    .reduce(
                                        (count, item) =>
                                            item.isSelectedForOrder === true ? count + (item?.total || 0) : count,
                                        0,
                                    )
                                    .toLocaleString('vi-VN')}
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

            <div className="lg:px-0 px-2">
                <MenuProduct title={'Có thể bạn cũng thích'} />
            </div>

            {Object.keys(chooseRemove).length > 0 && (
                <PopUpRemove
                    id={chooseRemove.id}
                    title={'Xóa sản phẩm trong giỏ hàng?'}
                    desc={`Bạn chắc chắn muốn xóa sản phẩm ${chooseRemove?.product?.name} không?`}
                    onRemove={() => handleRemoveCart(userData?.id, chooseRemove.id)}
                    onClose={() => setChooseRemove({})}
                    isRemove={Object.keys(chooseRemove).length > 0}
                />
            )}
        </div>
    );
}

export default Cart;
