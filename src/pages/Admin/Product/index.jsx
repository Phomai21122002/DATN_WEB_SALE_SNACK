import HeaderTable from '~/components/HeaderTabel';
import { listTitle } from './Constant';
import SearchSortListOfAdmin from '~/components/SearchSortListOfAdmin';
import { useEffect, useMemo, useState } from 'react';
import { AdminDeleteProduct } from '~/services/Product';
import noImage from '~/assets/images/No-image.png';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import { GetCategories } from '~/services/Category';
import { removeVietnameseTones } from '../Category/Constant';
import useGetProducts from '~/hooks/useGetProducts';
import Pagination from '~/components/Pagination';
import SkeletonRow from '~/components/SkeletonRow';
import PopUpRemove from '~/components/PopUpRemove';
import StatCardProduct from '~/components/StatCardProduct';

function Product() {
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [chooseRemove, setChooseRemove] = useState({});
    const navigate = useNavigate();

    const filters = useMemo(() => ({ PageNumber: page }), [page]);
    const { data, isLoading, refetchListProduct } = useGetProducts(filters);
    const totalPages = useMemo(() => {
        const totalCount = data?.totalCount || 0;
        return totalCount ? Math.ceil(totalCount / data?.pageSize) : 0;
    }, [data]);
    useEffect(() => {
        setAllProducts(data?.datas || []);
        setProducts(data?.datas || []);
    }, [data]);

    const editProduct = (slug) => {
        navigate(routes.adminUpdateProduct.replace(':slug', slug));
    };
    const deleteProduct = async (product) => {
        try {
            await AdminDeleteProduct(product?.id);
            await refetchListProduct();
            setChooseRemove({});
        } catch (error) {
            console.error('Error fetching product data: ', error);
        }
    };

    useEffect(() => {
        const getAllProduct = async () => {
            try {
                const resCategory = await GetCategories();
                setCategories(resCategory);
            } catch (err) {
                console.error('Error fetching product data: ', err);
            }
        };
        getAllProduct();
    }, []);

    const handleSortChange = (id) => {
        id
            ? setProducts(() => allProducts.filter((product) => product.category?.id === parseInt(id)))
            : setProducts(allProducts);
    };

    const handleSearchProduct = (title) => {
        const lowerTitle = removeVietnameseTones(title?.toLowerCase() || '');

        const filtered = lowerTitle
            ? allProducts.filter((product) => {
                  const name = removeVietnameseTones(product.name.toLowerCase());
                  return name.includes(lowerTitle);
              })
            : allProducts;

        setProducts(filtered);
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row gap-4 my-4 rounded-lg bg-gray-200 px-4 py-6">
                <StatCardProduct value={547} label="Total Products" type="product" />
                <StatCardProduct value={605} label="Total Categories" type="category" />
            </div>
            <SearchSortListOfAdmin
                title={'Chọn loại sản phẩm'}
                categories={categories}
                onSortChange={handleSortChange}
                onSearch={handleSearchProduct}
            />
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full text-left text-sm">
                    <HeaderTable listTitle={listTitle} />
                    <tbody>
                        {isLoading ? (
                            Array.from({ length: 10 }).map((_, idx) => <SkeletonRow key={idx} col={listTitle.length} />)
                        ) : products.length > 0 ? (
                            products.map((product, index) => (
                                <tr key={product.id} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-6">{index + 1}</td>
                                    <td className="py-3 px-6">
                                        {product.urls.length > 0 && (
                                            <img
                                                src={product.urls[0] || noImage}
                                                alt={`product-${product.id}`}
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                        )}
                                    </td>
                                    <td className="py-3 px-6">
                                        <p className="line-clamp-3 max-w-xs overflow-hidden text-ellipsis">
                                            {product.name}
                                        </p>
                                    </td>
                                    <td className="py-3 px-6">
                                        <p className="line-clamp-3 max-w-xs overflow-hidden text-ellipsis">
                                            {product.description}
                                        </p>
                                    </td>
                                    <td className="py-3 px-6">{product.quantity}</td>
                                    <td className="py-3 px-6">{product.price.toLocaleString()} VND</td>
                                    <td className="py-3 px-6">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs ${
                                                new Date(product.dateEnd) < new Date()
                                                    ? 'bg-red-200 text-red-800'
                                                    : 'bg-green-200 text-green-800'
                                            }`}
                                        >
                                            {product.createdAt} - {product.expiryDate}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6">
                                        <button
                                            className="text-blue-600 hover:underline mr-2"
                                            onClick={() => editProduct(product.slug)}
                                        >
                                            Chỉnh sửa
                                        </button>
                                        <button
                                            className="text-red-600 hover:underline"
                                            onClick={() => setChooseRemove(product)}
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={listTitle.length} className="text-center py-6 text-gray-500">
                                    Không có sản phẩm
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Pagination className={'m-8 justify-end'} page={page} setPage={setPage} totalPages={totalPages} />
            </div>
            {chooseRemove && (
                <PopUpRemove
                    id={chooseRemove.id}
                    title={'Xóa sản phẩm'}
                    desc={`Bạn có chắc chắn muốn xóa sản phẩm ${chooseRemove?.name} không?`}
                    onRemove={() => deleteProduct(chooseRemove)}
                    onClose={() => setChooseRemove({})}
                    isRemove={Object.keys(chooseRemove).length > 0}
                />
            )}
        </>
    );
}

export default Product;
