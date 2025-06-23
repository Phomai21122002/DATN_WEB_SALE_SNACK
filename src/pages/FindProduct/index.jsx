import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { useStorage } from '~/Contexts';
import { AddCart } from '~/services/Cart';
import { EQueryKeys } from '~/constants';
import routes from '~/config/routes';
import Product from '~/components/Product';
import SkeletonProduct from '~/components/SkeletonProduct';
import { GetRecommenedByNameProduct } from '~/services/Product';
import { updatedProducts } from '~/components/MenuProduct/Constains';
import MenuProductRecommender from '~/components/MenuProductRecommender';

function FindProduct() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { name: nameProduct } = useParams();
    const [products, setProducts] = useState([]);
    const { userData } = useStorage();
    const productsPerPage = 12;
    const [paginatedProducts, setPaginatedProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getDataRecommend = async () => {
            if (nameProduct !== '') {
                try {
                    setIsLoading(true);
                    console.log(nameProduct);
                    const res = await GetRecommenedByNameProduct({ Name: nameProduct });
                    console.log(res);
                    setProducts(updatedProducts(res));
                } catch (error) {
                    setIsLoading(false);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        getDataRecommend();
    }, [nameProduct]);

    const addToCart = async (productId, quantity) => {
        if (userData && Object.keys(userData).length > 0) {
            const res = await AddCart({
                quantity: quantity,
                userId: userData?.id,
                productId: productId,
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
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id && product.quantity >= newQuantity ? { ...product, count: newQuantity } : product,
            ),
        );
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    const sortedProducts = useMemo(() => {
        if (!products) return [];
        if (sortOrder === 'Thấp đến Cao') {
            return [...products].sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'Cao đến Thấp') {
            return [...products].sort((a, b) => b.price - a.price);
        }
        return products;
    }, [products, sortOrder]);

    return (
        <div className="flex pt-20 max-w-[1100px] mx-auto md:px-8">
            <div className="flex-1 p-4">
                <div>
                    Kết quả tìm kiếm cho từ khóa '<span className="text-red-500">{nameProduct}</span>'
                </div>
                <div className="flex justify-between mb-6 items-center mt-3">
                    <div className="flex items-center">
                        <div className="text-sm text-gray-500 mr-4">Sắp xếp theo:</div>
                        <select
                            className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={sortOrder}
                            onChange={handleSortChange}
                        >
                            <option value="">Chọn sắp xếp</option>
                            <option value="Thấp đến Cao">Giá thấp đến cao</option>
                            <option value="Cao đến Thấp">Giá cao đến thấp</option>
                        </select>
                    </div>
                </div>

                <MenuProductRecommender
                    title={`Sản phẩm liên quan đến '${nameProduct}'`}
                    loading={isLoading}
                    allProducts={sortedProducts}
                    setAllProducts={setProducts}
                />
            </div>
        </div>
    );
}

export default FindProduct;
