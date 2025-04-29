import HeaderTable from '~/components/HeaderTabel';
import { listTitle, updatedProducts } from './Constant';
import SearchSortListOfAdmin from '~/components/SearchSortListOfAdmin';
import { useEffect, useState } from 'react';
import { AdminDeleteProduct, GetProducts } from '~/services/Product';
import noImage from '~/assets/images/No-image.png';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import { GetCategories } from '~/services/Category';
import { Categories } from '~/components/MenuCategory/Constains';
import { removeVietnameseTones } from '../Category/Constant';

function Product() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    const navigate = useNavigate();

    const editOrder = (slug) => {
        navigate(routes.adminUpdateProduct.replace(':slug', slug));
    };
    const deleteOrder = async (id) => {
        try {
            await AdminDeleteProduct(id);
            setProducts((prev) => prev.filter((product) => product.id !== id));
        } catch (error) {
            console.error('Error fetching product data: ', error);
        }
    };

    useEffect(() => {
        const getAllProduct = async () => {
            try {
                const res = await GetProducts();
                setAllProducts(res);
                setProducts(res);
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
                        {products.map((product, index) => (
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
                                        onClick={() => editOrder(product.slug)}
                                    >
                                        Chỉnh sửa
                                    </button>
                                    <button
                                        className="text-red-600 hover:underline"
                                        onClick={() => deleteOrder(product.id)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {products.length === 0 && <div className="text-center py-6 text-gray-500">Không có đơn hàng nào</div>}
            </div>
        </>
    );
}

export default Product;
