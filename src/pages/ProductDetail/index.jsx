import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGooglePlus, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';

import Button from '~/components/Button';
import ImageSlider from '~/components/ImageSlider';
import CountNumber from '~/components/CountNumber';
import MenuProduct from '~/components/MenuProduct';
import { GetProductBySlug } from '~/services/Product';
import routes from '~/config/routes';
import { useStorage } from '~/Contexts';
import { AddCart } from '~/services/Cart';
import noImage from '~/assets/images/No-image.png';

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
            GetProductBySlug({ slug })
                .then((res) => {
                    setLoading(true);
                    const result = {
                        ...res,
                        count: 1,
                    };
                    setProduct(result);
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
        console.log(productId, quantity, userData);
        if (userData && Object.keys(userData).length > 0) {
            const res = await AddCart({
                quantity: quantity,
                userId: userData?.id,
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
                        {product.urls?.length > 0 || (
                            <Skeleton variant="rectangular" animation="wave" width={370} height={370} />
                        )}
                        <ImageSlider images={product.urls} />
                    </div>
                </div>

                <div className="flex-1 space-y-4">
                    {product?.name && !loading ? (
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
                        <p className="whitespace-pre-line text-gray-600 font-small text-[20px]">
                            {product.description}
                        </p>
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
            <div className="whitespace-pre-line text-gray-700 text-base leading-relaxed">
                {product.descriptionDetail}
            </div>
            <div className="bg-white w-full p-8">
                <h2 className="uppercase">Đánh giá sản phẩm</h2>
                <div className="mt-8 border-b-2 border-gray-300">
                    <div className="flex items-center">
                        <img className="w-16 h-16 rounded-full" src={'' || noImage} alt="" />
                        <div className="mx-4 text-xl">
                            <h4>phô mai</h4>
                            <p className="text-gray-500">2023-07-18 06:07 | Phân loại hàng: Đen,L</p>
                        </div>
                    </div>
                    <div className="mx-4 my-2">
                        <p className="whitespace-pre-line text-justify py-4">
                            Màu sắc: đen Vải đẹp lắm mn ơii mặc vừa mát vừa ấm nữa nèe Shop tư vấn rất nhiệt tình và rep
                            cực nhanh nha chạy đơn cũn nhanh nữa, Mn có thể xem ở ảnh nha Mình mua tặng anh ny nma mặc
                            thử cũn oce phết ý🥳 Chất lượng xuất sắc luôn đường may chắc đẹp và đặc biệt KHÔNG CÓ CHỈ
                            THỪA nhaa 10 điểm cho sự chu đáo và dễ thuông nàyy Shop nên tặng kèm giấy thơm thì ocee hơn
                            á:33 cảm ơn shopp nhiều ạ sẽ ủng hộ thêm
                        </p>
                        <div className="flex items-center py-2">
                            <img className="w-32 h-32 mr-4" src={'' || noImage} alt="" />
                            <img className="w-32 h-32 mr-4" src={'' || noImage} alt="" />
                            <img className="w-32 h-32 mr-4" src={'' || noImage} alt="" />
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-b-2 border-gray-300">
                    <div className="flex items-center">
                        <img className="w-16 h-16 rounded-full" src={'' || noImage} alt="" />
                        <div className="mx-4 text-xl">
                            <h4>phô mai</h4>
                            <p className="text-gray-500">2023-07-18 06:07 | Phân loại hàng: Đen,L</p>
                        </div>
                    </div>
                    <div className="mx-4 my-2">
                        <p className="whitespace-pre-line text-justify py-4">
                            Màu sắc: đen Vải đẹp lắm mn ơii mặc vừa mát vừa ấm nữa nèe Shop tư vấn rất nhiệt tình và rep
                            cực nhanh nha chạy đơn cũn nhanh nữa, Mn có thể xem ở ảnh nha Mình mua tặng anh ny nma mặc
                            thử cũn oce phết ý🥳 Chất lượng xuất sắc luôn đường may chắc đẹp và đặc biệt KHÔNG CÓ CHỈ
                            THỪA nhaa 10 điểm cho sự chu đáo và dễ thuông nàyy Shop nên tặng kèm giấy thơm thì ocee hơn
                            á:33 cảm ơn shopp nhiều ạ sẽ ủng hộ thêm
                        </p>
                        <div className="flex items-center py-2">
                            <img className="w-32 h-32 mr-4" src={'' || noImage} alt="" />
                            <img className="w-32 h-32 mr-4" src={'' || noImage} alt="" />
                            <img className="w-32 h-32 mr-4" src={'' || noImage} alt="" />
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-b-2 border-gray-300">
                    <div className="flex items-center">
                        <img className="w-16 h-16 rounded-full" src={'' || noImage} alt="" />
                        <div className="mx-4 text-xl">
                            <h4>phô mai</h4>
                            <p className="text-gray-500">2023-07-18 06:07 | Phân loại hàng: Đen,L</p>
                        </div>
                    </div>
                    <div className="mx-4 my-2">
                        <p className="whitespace-pre-line text-justify py-4">
                            Màu sắc: đen Vải đẹp lắm mn ơii mặc vừa mát vừa ấm nữa nèe Shop tư vấn rất nhiệt tình và rep
                            cực nhanh nha chạy đơn cũn nhanh nữa, Mn có thể xem ở ảnh nha Mình mua tặng anh ny nma mặc
                            thử cũn oce phết ý🥳 Chất lượng xuất sắc luôn đường may chắc đẹp và đặc biệt KHÔNG CÓ CHỈ
                            THỪA nhaa 10 điểm cho sự chu đáo và dễ thuông nàyy Shop nên tặng kèm giấy thơm thì ocee hơn
                            á:33 cảm ơn shopp nhiều ạ sẽ ủng hộ thêm
                        </p>
                        <div className="flex items-center py-2">
                            <img className="w-32 h-32 mr-4" src={'' || noImage} alt="" />
                            <img className="w-32 h-32 mr-4" src={'' || noImage} alt="" />
                            <img className="w-32 h-32 mr-4" src={'' || noImage} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <MenuProduct title={'Các sản phẩm liên quan'} />
        </div>
    );
}

export default ProductDetail;
