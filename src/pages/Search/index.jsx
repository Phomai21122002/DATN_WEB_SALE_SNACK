import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FilterList } from '@mui/icons-material';
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

function Search() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { id: idCategory } = useParams();
    const [products, setProducts] = useState([]);
    const { userData } = useStorage();
    const [page, setPage] = useState(1);
    const productsPerPage = 9;
    const [paginatedProducts, setPaginatedProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(idCategory || '');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const { data: categories } = useGetCategories();
    const filters = useMemo(() => {
        let isDecsending = null;
        if (sortOrder === 'Thấp đến Cao') isDecsending = false;
        else if (sortOrder === 'Cao đến Thấp') isDecsending = true;
        return {
            categoryId: selectedCategory,
            PageNumber: page,
            PageSize: productsPerPage,
            isDecsending: isDecsending,
        };
    }, [page, selectedCategory, sortOrder]);
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
        if (Number(selectedCategory)) {
            let filteredProducts = [...products];
            setPaginatedProducts(
                filteredProducts.filter((product) => product.category.id === Number(selectedCategory)),
            );
        } else {
            setPaginatedProducts(products);
        }
    }, [selectedCategory, products]);

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

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <div className="flex pt-20 max-w-[1100px] mx-auto px-8">
            <div className="w-1/4 p-4 border-r border-gray-200">
                <div className="font-semibold text-lg mb-6 flex items-center">
                    <FilterList className="mr-2 text-gray-500" /> Bộ lọc tìm kiếm
                </div>

                <div className="mb-6">
                    <div className="text-sm font-medium mb-2">Theo Danh Mục</div>
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                    >
                        <option value={0}>Chọn loại sản phẩm</option>
                        {categories &&
                            categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                    </select>
                </div>

                <div className="mb-6">
                    <div className="text-sm font-medium mb-2">Theo Giá</div>
                    <div className="flex justify-between text-xs">
                        <input
                            type="number"
                            className="w-1/2 p-2 border border-gray-300 rounded"
                            placeholder="Từ"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <span className="mx-1">-</span>
                        <input
                            type="number"
                            className="w-1/2 p-2 border border-gray-300 rounded"
                            placeholder="Đến"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="flex-1 p-4">
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

                <div className="grid grid-cols-3 gap-2">
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
                <div className="flex justify-end mt-8 items-center">
                    <Pagination page={page} setPage={setPage} totalPages={totalPages} className={'m-8 justify-end'} />
                </div>
            </div>
        </div>
    );
}

export default Search;
