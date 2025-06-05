import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGooglePlus, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { Skeleton } from '@mui/material';
import Button from '~/components/Button';
import ImageSlider from '~/components/ImageSlider';
import CountNumber from '~/components/CountNumber';
import { GetProductBySlug, GetRecommenedProductBySlug } from '~/services/Product';
import { useStorage } from '~/Contexts';
import { AddCart } from '~/services/Cart';
import noImage from '~/assets/images/No-image.png';
import Image from '~/components/Image';
import { uploadMediaToCloudinary } from '../Admin/CreateProduct/Constant';
import { CreateFeedBack } from '~/services/Feedback';
import useGetFeedBacks from '~/hooks/useGetFeedBacks';
import { useQueryClient } from '@tanstack/react-query';
import { EQueryKeys } from '~/constants';
import Pagination from '~/components/Pagination';
import routes from '~/config/routes';
import SkeletonProduct from '~/components/SkeletonProduct';
import Product from '~/components/Product';
import { updatedProducts } from '~/components/MenuProduct/Constains';
import StarRate from '~/components/StarRate';
import { convertRatingData } from './Constants';

const ProductDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { userData } = useStorage();

    const [product, setProduct] = useState({});
    const [feedbacks, setFeedbacks] = useState([]);
    const [revenueRating, setRevenueRating] = useState({});
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [reviewContent, setReviewContent] = useState('');
    const [reviewMedia, setReviewMedia] = useState([]);
    const [chooseAddComment, setChooseAddComment] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const [rating, setRating] = useState(null);

    useEffect(() => {
        const getProductById = async () => {
            setLoading(true);
            try {
                const res = await GetProductBySlug({ slug });
                setProduct({ ...res, count: 1 });
                const resRecommendedProduct = await GetRecommenedProductBySlug({ slug });
                setAllProducts(updatedProducts(resRecommendedProduct.recommendedProduct));
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        getProductById();
    }, [slug]);

    const filterFeedbacks = useMemo(
        () => ({ userId: userData?.id, productId: product?.id, PageSize: 5, PageNumber: page }),
        // eslint-disable-next-line
        [page, userData?.id, product?.id],
    );
    const { data } = useGetFeedBacks(filterFeedbacks);
    useEffect(() => {
        setFeedbacks(data?.datas[0].feedBacks || []);
        setRevenueRating(convertRatingData(data?.datas[0]));
    }, [data]);

    const handleMediaUpload = async (e) => {
        const files = Array.from(e.target.files);
        const uploadedUrls = await Promise.all(files.map((file) => uploadMediaToCloudinary(file)));
        setReviewMedia((prev) => [...prev, ...uploadedUrls]);
    };

    const handleRemoveMedia = (index) => setReviewMedia((prev) => prev.filter((_, i) => i !== index));

    const handleAddReview = async () => {
        try {
            await CreateFeedBack(userData.id, {
                productId: product?.id,
                rate: rating,
                content: reviewContent,
                urls: reviewMedia,
            });
            queryClient.invalidateQueries([
                EQueryKeys.GET_LIST_FEEDBACK,
                { userId: userData.id, productId: product.id },
            ]);
            setReviewContent('');
            setReviewMedia([]);
            setChooseAddComment(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handlePurchase = async () => {
        if (userData) {
            await AddCart({ quantity: product.count, userId: userData.id, productId: product.id });
            queryClient.invalidateQueries([EQueryKeys.GET_LIST_CART, userData.id]);
            navigate(routes.cart);
        } else {
            navigate(routes.login);
        }
    };

    const totalCount = data?.totalCount || 0;
    const totalPages = totalCount ? Math.ceil(totalCount / data?.pageSize) : 0;

    const addToCart = async (productId, quantity) => {
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
        <div className="max-w-[1200px] mx-auto pt-32">
            <div className="flex flex-col md:flex-row gap-8 mb-12">
                <div className="flex-1">
                    <div className="w-full max-w-md mx-auto">
                        {product.urls?.length > 0 ? (
                            <ImageSlider images={product.urls} />
                        ) : (
                            <Skeleton variant="rectangular" width={370} height={370} />
                        )}
                    </div>
                </div>

                <div className="flex-1 space-y-4">
                    <h1 className="text-2xl font-semibold">
                        {product?.name || <Skeleton variant="text" className="text-lg" />}
                    </h1>
                    <div className="text-xl font-bold text-red-500">
                        {product?.price ? (
                            `${Number(product.price).toLocaleString('vi-VN', { currency: 'VND' })}đ`
                        ) : (
                            <Skeleton variant="text" />
                        )}
                    </div>
                    <p className="whitespace-pre-line text-gray-600 font-small text-[20px]">
                        {product?.description || <Skeleton variant="text" />}
                    </p>
                    <div className="flex items-center gap-4">
                        <CountNumber
                            product={product}
                            quantity={product?.count || 1}
                            onUpdateQuantity={(id, qty) => setProduct((prev) => ({ ...prev, count: qty }))}
                        />
                        <Button handle={handlePurchase} rouded title="MUA HÀNG" />
                    </div>
                    <p className="text-sm text-gray-600">còn {product.quantity} sản phẩm</p>

                    {/* Social Share */}
                    <div className="flex items-center gap-4 mt-4 cursor-pointer">
                        <span className="text-sm font-semibold uppercase">Chia sẻ</span>
                        <FontAwesomeIcon className="text-blue-600" icon={faFacebook} />
                        <FontAwesomeIcon className="text-sky-500" icon={faTwitter} />
                        <FontAwesomeIcon className="text-red-500" icon={faGooglePlus} />
                    </div>
                </div>
            </div>

            <div className="px-12 whitespace-pre-line text-gray-700 text-xl leading-relaxed">
                {product.descriptionDetail}
            </div>

            <div className="bg-white w-full p-8 my-8">
                <h2 className="uppercase">Đánh giá sản phẩm</h2>
                <div className="flex flex-col md:flex-row items-center md:items-center mt-8 mb-12 gap-6">
                    <div className="flex flex-col items-center justify-center w-full h-full md:w-1/4">
                        <span className="text-5xl font-semibold text-red-500">{revenueRating.starAverage}</span>
                        <span className="text-red-500 text-lg font-medium">ĐÁNH GIÁ TRUNG BÌNH</span>
                    </div>

                    <div className="flex flex-col w-full md:w-3/4 space-y-2">
                        {[5, 4, 3, 2, 1].map((star) => {
                            const count = revenueRating[star] || 0;
                            const percent =
                                revenueRating.totalRating > 0
                                    ? Math.round((count / revenueRating.totalRating) * 100)
                                    : 0;
                            return (
                                <div key={star} className="flex items-center">
                                    <span className="w-6 text-sm font-semibold">{star}★</span>
                                    <div className="flex-1 h-2 bg-gray-200 mx-2 relative rounded overflow-hidden">
                                        <div className="h-full bg-red-500" style={{ width: `${percent}%` }} />
                                    </div>
                                    <span className="w-20 text-sm text-gray-600">
                                        {percent}% ({count})
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {feedbacks.length > 0 ? (
                    feedbacks.map((feedback, index) => (
                        <div key={index} className="mt-6 border-b-2 border-gray-300">
                            <div className="flex items-center">
                                <img
                                    className="w-16 h-16 rounded-full"
                                    src={feedback.user?.url || noImage}
                                    alt="avatar"
                                />
                                <div className="mx-4 text-xl">
                                    <h4 className="leading-none">
                                        {feedback.user.firstName + ' ' + feedback.user.lastName}
                                    </h4>
                                    <StarRate rating={feedback?.rate || 0} setRating={setRating} />
                                    <p className="text-lg text-gray-500">
                                        {new Date(feedback.createdAt)?.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <div className="mx-4 my-2">
                                <p className="whitespace-pre-line text-xl text-justify py-4">{feedback.content}</p>
                                {feedback.imageFeedBacks?.length > 0 && (
                                    <div className="flex items-center flex-wrap py-2 gap-4">
                                        {feedback.imageFeedBacks.map((url, i) => (
                                            <div key={i} className="w-36 h-36">
                                                {url.url.match(/.(mp4|webm)$/) ? (
                                                    <video controls className="w-full h-full">
                                                        <source src={url.url} type="video/mp4" />
                                                    </video>
                                                ) : (
                                                    <Image src={url.url} className="object-cover w-full h-full" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-6 text-gray-500">Không có lượt đánh giá</div>
                )}
                <Pagination page={page} setPage={setPage} totalPages={totalPages} />

                <span
                    onClick={() => setChooseAddComment((prev) => !prev)}
                    className="flex justify-end my-8 cursor-pointer text-xl hover:text-blue-500"
                >
                    Thêm đánh giá
                </span>

                {/* Add Review */}
                {chooseAddComment && (
                    <div className="bg-white w-full p-8 mt-8">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleAddReview();
                            }}
                            className="space-y-4"
                        >
                            <h2 className="uppercase mb-4 text-xl">Đánh giá của bạn</h2>
                            <StarRate className={'mb-4'} sizeStar={40} gap={4} rating={rating} setRating={setRating} />

                            <h2 className="uppercase mb-4 text-xl">Nhận xét của bạn</h2>
                            <textarea
                                placeholder="Nội dung đánh giá"
                                className="border text-xl p-2 w-full rounded"
                                rows={4}
                                value={reviewContent || ''}
                                onChange={(e) => setReviewContent(e.target.value)}
                                required
                            />
                            <input
                                className="text-xl"
                                type="file"
                                accept="image/*,video/*"
                                multiple
                                onChange={handleMediaUpload}
                            />
                            <div className="flex gap-4 flex-wrap">
                                {reviewMedia.map((url, index) => (
                                    <div key={index} className="relative">
                                        {url.match(/.(mp4|webm)$/) ? (
                                            <video controls className="w-32 h-32">
                                                <source src={url} type="video/mp4" />
                                            </video>
                                        ) : (
                                            <Image src={url} className="w-32 h-32 object-cover rounded" />
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveMedia(index)}
                                            className="absolute top-0 right-0 text-red-500"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button type="submit" className="w-full  text-xl bg-blue-600 text-white px-4 py-2 rounded">
                                Gửi đánh giá
                            </button>
                        </form>
                    </div>
                )}
            </div>

            <div className="py-4">
                <div className="flex text-xl text-gray-500 font-medium mb-4 uppercase">Các sản phẩm liên quan</div>
                <div className="relative">
                    <div className="overflow-hidden">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 transition-all duration-500 p-1">
                            {loading
                                ? Array.from({ length: 5 }).map((_, index) => <SkeletonProduct key={index} />)
                                : allProducts.map((product) => (
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
            </div>
        </div>
    );
};

export default ProductDetail;
