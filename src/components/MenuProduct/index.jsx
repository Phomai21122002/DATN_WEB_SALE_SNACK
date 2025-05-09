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
                const resultRes = updatedProducts(res);
                setProducts(resultRes);
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
                userId: userData?.id,
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
                product.id === id && product.quantity >= newQuantity ? { ...product, count: newQuantity } : product,
            ),
        );
    };

    return (
        <div className="py-4">
            <div className="flex text-xl text-gray-500 font-medium mb-4 uppercase">{title}</div>
            <div className="relative">
                <div className="overflow-hidden">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 transition-all duration-500 p-1">
                        {products?.map((product) => (
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
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size="small"
                />
            </div>
        </div>
    );
}

export default MenuProduct;
