import Product from '../Product';
import { memo } from 'react';
import SkeletonProduct from '../SkeletonProduct';
import { useStorage } from '~/Contexts';
import { AddCart } from '~/services/Cart';
import { useQueryClient } from '@tanstack/react-query';
import { EQueryKeys } from '~/constants';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';

function MenuProductRecommender({ title, loading, allProducts = [], setAllProducts }) {
    const { userData } = useStorage();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const addToCart = async (productId, quantity) => {
        if (userData && Object.keys(userData).length > 0) {
            const res = await AddCart({
                quantity,
                userId: userData.id,
                productId,
            });
            res &&
                queryClient.invalidateQueries({
                    queryKey: [EQueryKeys.GET_LIST_CART, userData?.id],
                });
        } else {
            navigate(routes.login);
        }
    };

    const updateQuantity = (id, newQuantity) => {
        setAllProducts((prev) =>
            prev.map((product) => (product.id === id ? { ...product, count: newQuantity } : product)),
        );
    };

    return (
        <>
            <div className="flex text-xl text-gray-500 font-medium mb-4 uppercase">{title}</div>
            <div className="relative">
                <div className="overflow-hidden">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 transition-all duration-500 p-1">
                        {loading
                            ? Array.from({ length: 5 }).map((_, index) => <SkeletonProduct key={index} />)
                            : allProducts.map((product) => (
                                  <Product
                                      key={product.id}
                                      product={product}
                                      addToCart={addToCart}
                                      updateQuantity={updateQuantity}
                                  />
                              ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default memo(MenuProductRecommender);
