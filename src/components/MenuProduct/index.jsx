import { useNavigate } from 'react-router-dom';
import { Pagination } from '@mui/material';
import { useStorage } from '~/Contexts';
import { AddCart } from '~/services/Cart';
import Product from '../Product';
import { updatedProducts } from './Constains';
import useGetProducts from '~/hooks/useGetProducts'; // nơi chứa useInfiniteQuery
import routes from '~/config/routes';
import { useState, useEffect } from 'react';
import { useQueryString } from '~/utils/searchParams';
import { useQueryClient } from '@tanstack/react-query';
import { EQueryKeys } from '~/constants';

function MenuProduct({ title }) {
    const navigate = useNavigate();
    const queryString = useQueryString();
    const queryClient = useQueryClient();
    const page = Number(queryString.page) || 1;
    const { userData } = useStorage();
    const filters = { PageNumber: page };
    const [allProducts, setAllProducts] = useState([]);
    const { data, isLoading } = useGetProducts(filters);

    useEffect(() => {
        setAllProducts(updatedProducts(data?.datas || []));
    }, [data]);

    const totalCount = data?.totalCount || 0;
    const pageSize = data?.pageSize || 10;
    const totalPages = totalCount ? Math.ceil(totalCount / pageSize) : 0;

    const handlePageChange = (event, value) => {
        navigate(`${routes.home}?page=${value}`);
    };

    const addToCart = async (productId, quantity) => {
        console.log(productId, quantity);
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
        <div className="py-4">
            <div className="flex text-xl text-gray-500 font-medium mb-4 uppercase">{title}</div>
            <div className="relative">
                <div className="overflow-hidden">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 transition-all duration-500 p-1">
                        {allProducts.map((product) => (
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

export default MenuProduct;
