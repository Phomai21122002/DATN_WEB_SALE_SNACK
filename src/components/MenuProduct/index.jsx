import { useNavigate } from 'react-router-dom';
import { Pagination } from '@mui/material';
import { useStorage } from '~/Contexts';
import { AddCart } from '~/services/Cart';
import Product from '../Product';
import { updatedProducts } from './Constains';
import useGetProducts from '~/hooks/useGetProducts';
import routes from '~/config/routes';
import { useState, useEffect, memo, useMemo } from 'react';
import SkeletonProduct from '../SkeletonProduct';

function MenuProduct({ title }) {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const { userData, refetchListCart } = useStorage();

    const filters = useMemo(() => ({ PageNumber: page }), [page]);
    const [allProducts, setAllProducts] = useState([]);
    const { data, isLoading } = useGetProducts(filters);

    const totalPages = useMemo(() => {
        const totalCount = data?.totalCount || 0;
        return totalCount ? Math.ceil(totalCount / data?.pageSize) : 0;
    }, [data]);

    useEffect(() => {
        setAllProducts(updatedProducts(data?.datas || []));
    }, [data]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const addToCart = async (productId, quantity) => {
        if (userData && Object.keys(userData).length > 0) {
            const res = await AddCart({
                quantity,
                userId: userData.id,
                productId,
            });
            res && (await refetchListCart());
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
        <div className="py-4">
            <div className="flex text-xl text-gray-500 font-medium mb-4 uppercase">{title}</div>
            <div className="relative">
                <div className="overflow-hidden">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 transition-all duration-500 p-1">
                        {isLoading
                            ? Array.from({ length: 10 }).map((_, index) => <SkeletonProduct key={index} />)
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
            <div className="flex justify-end items-center">
                <Pagination
                    count={totalPages || 0}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    size="small"
                />
            </div>
        </div>
    );
}

export default memo(MenuProduct);
