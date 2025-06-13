import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { useStorage } from '~/Contexts';
import { updatedProducts } from '~/components/MenuProduct/Constains';
import { AddCart } from '~/services/Cart';
import { EQueryKeys } from '~/constants';
import routes from '~/config/routes';
import Product from '~/components/Product';
import useGetCategories from '~/hooks/useGetCategories';
import useGetProductsByIdCategory from '~/hooks/useGetProductsByIdCategory';
import Pagination from '~/components/Pagination';
import SkeletonProduct from '~/components/SkeletonProduct';
import FilterSidebar from '~/components/FilterSidebar';

function CategoryDetail() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { id: idCategory } = useParams();
    const [products, setProducts] = useState([]);
    const { userData } = useStorage();
    const [page, setPage] = useState(1);
    const productsPerPage = 12;
    const [paginatedProducts, setPaginatedProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const { data: categories } = useGetCategories();
    const filters = useMemo(() => {
        let isDecsending = null;
        if (sortOrder === 'Thấp đến Cao') isDecsending = false;
        else if (sortOrder === 'Cao đến Thấp') isDecsending = true;
        return {
            categoryId: idCategory,
            PageNumber: page,
            PageSize: productsPerPage,
            isDecsending: isDecsending,
        };
    }, [page, idCategory, sortOrder]);
    const { data, isLoading } = useGetProductsByIdCategory(filters);

    const totalPages = useMemo(() => {
        const totalCount = data?.totalCount || 0;
        return totalCount ? Math.ceil(totalCount / data?.pageSize) : 0;
    }, [data]);

    useEffect(() => {
        setProducts(updatedProducts(data?.datas || []));
    }, [data]);

    useEffect(() => {
        let filteredProducts = [...products];

        if (minPrice !== '' || maxPrice !== '') {
            filteredProducts = filteredProducts.filter((product) => {
                const price = product.price;
                const isWithinMin = minPrice === '' || price >= parseFloat(minPrice);
                const isWithinMax = maxPrice === '' || price <= parseFloat(maxPrice);
                return isWithinMin && isWithinMax;
            });
        }

        const indexOfLastProduct = page * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        let currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

        setPaginatedProducts(currentProducts);
    }, [page, products, sortOrder, minPrice, maxPrice]);

    useEffect(() => {
        if (Number(idCategory)) {
            let filteredProducts = [...products];
            setPaginatedProducts(filteredProducts.filter((product) => product.category.id === Number(idCategory)));
        } else {
            setPaginatedProducts(products);
        }
    }, [idCategory, products]);

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

    return (
        <div className="flex pt-20 max-w-[1100px] mx-auto md:px-8">
            <div className="hidden md:block w-1/4 p-4 border-r border-gray-200">
                <FilterSidebar
                    setMinPrice={setMinPrice}
                    setMaxPrice={setMaxPrice}
                    categories={categories}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    selectedCategory={idCategory}
                />
            </div>

            <div className="flex-1 p-4">
                <div className="block md:hidden w-full p-4 border-b border-gray-200 mb-4">
                    <FilterSidebar
                        setMinPrice={setMinPrice}
                        setMaxPrice={setMaxPrice}
                        categories={categories}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        selectedCategory={idCategory}
                    />
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

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grip-cols-3 gap-2">
                    {isLoading
                        ? Array.from({ length: productsPerPage }).map((_, index) => <SkeletonProduct key={index} />)
                        : paginatedProducts?.map((product) => (
                              <Product
                                  key={product.id}
                                  product={product}
                                  addToCart={addToCart}
                                  updateQuantity={updateQuantity}
                              />
                          ))}
                </div>
                <div className="flex justify-end mt-4 items-center">
                    <Pagination page={page} setPage={setPage} totalPages={totalPages} className={'justify-end'} />
                </div>
            </div>
        </div>
    );
}

export default CategoryDetail;
