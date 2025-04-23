import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGooglePlus, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';

import Button from '~/components/Button';
import ImageSlider from '~/components/ImageSlider';
import CountNumber from '~/components/CountNumber';
import MenuProduct from '~/components/MenuProduct';
import { GetProduct } from '~/services/Product';
import routes from '~/config/routes';
import { useStorage } from '~/Contexts';
import { AddCart } from '~/services/Cart';

function ProductDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { userData, getDataCartNow } = useStorage();
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({});

    const updateQuantity = (id, newQuantity) => {
        setProduct((prevProducts) => ({ ...prevProducts, count: newQuantity }));
    };

    useEffect(() => {
        const getProductById = () => {
            GetProduct({ slug })
                .then((res) => {
                    setLoading(true);
                    console.log(res);
                    // const result = {
                    //     ...res,
                    //     ...res?.product,
                    //     count: 1,
                    // };
                    // setProduct(result);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        };
        getProductById();
    }, [slug]);

    const handlePurchase = async (productId, quantity) => {
        if (userData && Object.keys(userData).length > 0) {
            const res = await AddCart({
                quantity: quantity,
                userId: userData?.userId,
                productId: productId,
            });
            res && getDataCartNow();
            navigate(routes.cart);
        } else {
            navigate(routes.login);
        }
    };

    return (
        <div className="max-w-[1200px] mx-auto pt-32">
            <div className="flex flex-col md:flex-row gap-8 mb-12">
                <div className="flex-1">
                    <div className="w-full max-w-md mx-auto">
                        {product.imageDtos?.length > 0 || (
                            <Skeleton variant="rectangular" animation="wave" width={370} height={370} />
                        )}
                        <ImageSlider images={product.imageDtos} />
                    </div>
                </div>

                <div className="flex-1 space-y-4">
                    {product?.product?.name && !loading ? (
                        <h1 className="text-2xl font-semibold">{product.name}</h1>
                    ) : (
                        <Skeleton variant="text" className="text-lg" />
                    )}

                    <div className="text-xl font-bold text-red-500">
                        {product.price && !loading ? (
                            <span>{`${Number(product.price).toLocaleString('vi-VN', {
                                currency: 'VND',
                            })}đ`}</span>
                        ) : (
                            <Skeleton variant="text" className="w-full" />
                        )}
                    </div>

                    {product.description && !loading ? (
                        <p className="text-gray-600 font-small text-[20px]">{product.description}</p>
                    ) : (
                        <Skeleton variant="text" className="w-full" />
                    )}

                    <div className="flex items-center gap-4">
                        <CountNumber
                            product={product}
                            quantity={product?.count || 0}
                            onUpdateQuantity={updateQuantity}
                        />
                        <Button handle={() => handlePurchase(product?.id, product?.count)} rouded title="MUA HÀNG" />
                    </div>
                    <p className="text-sm text-gray-600">còn {product.quantity} sản phẩm</p>

                    <div className="flex items-center gap-4 mt-4 cursor-pointer">
                        <span className="text-sm font-semibold uppercase">Chia sẻ</span>
                        <FontAwesomeIcon className="text-blue-600" icon={faFacebook} />
                        <FontAwesomeIcon className="text-sky-500" icon={faTwitter} />
                        <FontAwesomeIcon className="text-red-500" icon={faGooglePlus} />
                    </div>
                </div>
            </div>

            <MenuProduct title={'Các sản phẩm liên quan'} />
        </div>
    );
}

export default ProductDetail;
