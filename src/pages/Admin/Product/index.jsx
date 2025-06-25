import HeaderTable from '~/components/HeaderTabel';
import { listTitle, updatedProducts } from './Constant';
import SearchSortListOfAdmin from '~/components/SearchSortListOfAdmin';
import { useEffect, useMemo, useState } from 'react';
import { AdminDeleteProduct, GetDataOnCSV } from '~/services/Product';
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
import { GetStatistic } from '~/services/Statistic';
import { useStorage } from '~/Contexts';

function Product() {
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [chooseNameCategory, setChooseNameCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [chooseRemove, setChooseRemove] = useState({});
    const [statistic, setStatistic] = useState({});
    const [nameSearch, setNameSearch] = useState(null);
    const { token } = useStorage();

    const navigate = useNavigate();

    const filters = useMemo(
        () => ({ Name: nameSearch, categoryId: chooseNameCategory, PageNumber: page }),
        [page, chooseNameCategory, nameSearch],
    );
    const { data, isLoading, refetchListProduct } = useGetProducts(filters);
    const totalPages = useMemo(() => {
        const totalCount = data?.totalCount || 0;
        return totalCount ? Math.ceil(totalCount / data?.pageSize) : 0;
    }, [data]);
    useEffect(() => {
        setProducts(updatedProducts(data?.datas || []));
    }, [data]);

    const editProduct = (slug) => {
        navigate(routes.adminUpdateProduct.replace(':slug', slug));
    };
    const deleteProduct = async (product) => {
        try {
            await AdminDeleteProduct(product?.id);
            await refetchListProduct();
            setChooseRemove({});
            if (token) GetDataOnCSV({ token: token });
        } catch (error) {
            console.error('Error fetching product data: ', error);
        }
    };

    useEffect(() => {
        const getAllCategory = async () => {
            try {
                const resCategory = await GetCategories();
                setCategories(resCategory);
                const res = await GetStatistic();
                setStatistic(res);
            } catch (err) {
                console.error('Error fetching product data: ', err);
            }
        };
        getAllCategory();
    }, []);

    const handleSortChange = (id) => {
        setChooseNameCategory(Number(id));
    };

    const handleSearchProduct = (title) => {
        setNameSearch(removeVietnameseTones(title?.toLowerCase()));
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row gap-4 my-4 rounded-lg bg-gray-200 px-4 py-6">
                <StatCardProduct value={statistic?.totalProducts} label="Total Products" type="product" />
                <StatCardProduct value={statistic?.totalCategories} label="Total Categories" type="category" />
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
                                <tr
                                    key={product.id}
                                    onClick={() => navigate(routes.adminFeedBackProduct.replace(':slug', product.slug))}
                                    className="border-b hover:bg-gray-50 cursor-pointer"
                                >
                                    <td className="py-3 px-6">{(page - 1) * data?.pageSize + index + 1}</td>
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
                                        <span className={`px-3 py-1 rounded-full text-xs bg-green-200 text-green-800`}>
                                            {product.usageDuration}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6">
                                        <button
                                            className="text-blue-600 hover:underline mr-2"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                editProduct(product.slug);
                                            }}
                                        >
                                            Chỉnh sửa
                                        </button>
                                        <button
                                            className="text-red-600 hover:underline"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setChooseRemove(product);
                                            }}
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
