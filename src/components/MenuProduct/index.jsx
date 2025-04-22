import { useEffect, useState } from 'react';
import Product from '../Product';
import { GetProducts } from '~/services/Product';
import { updatedProducts } from './Constains';
import { useStorage } from '~/Contexts';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import { AddCart } from '~/services/Cart';
import { Pagination } from '@mui/material';

function MenuProduct({ title }) {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { userData, getDataCartNow } = useStorage();
    const navigate = useNavigate();
    const productsPerPage = 10;

    useEffect(() => {
        const getAllProduct = async () => {
            try {
                const res = await GetProducts();
                const resultProducts = updatedProducts(res);
                setProducts(resultProducts);
            } catch (err) {
                console.error('Error fetching product data: ', err);
            }
        };
        getAllProduct();
    }, []);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    const totalPages = Math.ceil(products.length / productsPerPage);

    const addToCart = async (productId, quantity) => {
        if (userData && Object.keys(userData).length > 0) {
            const res = await AddCart({
                quantity: quantity,
                userId: userData?.userId,
                productId: productId,
            });
            res && getDataCartNow();
        } else {
            navigate(routes.login);
        }
    };

    const updateQuantity = (id, newQuantity) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.product.id === id && product.product.quantity >= newQuantity
                    ? { ...product, product: { ...product.product, count: newQuantity } }
                    : product,
            ),
        );
    };

    return (
        <div className="py-4">
            <div className="flex items-center justify-between">
                <div className="flex text-xl text-gray-500 font-medium mb-4 uppercase">{title}</div>
                <div className="flex items-center">
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        size="small"
                    />
                </div>
            </div>
            <div className="relative">
                <div className="overflow-hidden">
                    <div className="grid grid-cols-5 gap-2 transition-all duration-500 p-1">
                        {products?.map((product) => (
                            <Product
                                key={product.product.id}
                                product={product}
                                addToCart={addToCart}
                                updateQuantity={updateQuantity}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuProduct;
