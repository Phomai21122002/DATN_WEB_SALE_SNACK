import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { Skeleton } from '@mui/material';

import Button from '~/components/Button';
import ImageSlider from '~/components/ImageSlider';
import CountNumber from '~/components/CountNumber';
import { GetProductBySlug, GetRecommenedProductBySlug } from '~/services/Product';
import { useStorage } from '~/Contexts';
import { AddCart } from '~/services/Cart';
import { CreateFeedBack } from '~/services/Feedback';
import useGetFeedBacks from '~/hooks/useGetFeedBacks';
import { useQueryClient } from '@tanstack/react-query';
import { EQueryKeys } from '~/constants';
import Pagination from '~/components/Pagination';
import routes from '~/config/routes';
import { updatedProducts } from '~/components/MenuProduct/Constains';
import { convertRatingData, getRatingDescription } from './Constants';
import ItemFeedback from '~/components/ItemFeedback';
import ReviewForm from '~/components/ReviewForm';
import MenuProductRecommender from '~/components/MenuProductRecommender';

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
    const [chooseAddComment, setChooseAddComment] = useState(false);
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const getProductById = async () => {
            setLoading(true);
            try {
                const res = await GetProductBySlug({ slug });
                setProduct({ ...res, count: 1 });
                const resRecommendedProduct = await GetRecommenedProductBySlug({ slug });
                setAllProducts(updatedProducts(resRecommendedProduct));
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
    const { data, refetchListFeedback } = useGetFeedBacks(filterFeedbacks);
    useEffect(() => {
        setFeedbacks(data?.datas[0].feedBacks || []);
        setRevenueRating(convertRatingData(data?.datas[0]));
    }, [data]);

    const handleAddReview = async (rating, content, mediaFiles) => {
        try {
            await CreateFeedBack(userData.id, {
                productId: product?.id,
                rate: rating,
                content: content,
                urls: mediaFiles,
            });
            queryClient.invalidateQueries([
                EQueryKeys.GET_LIST_FEEDBACK,
                { userId: userData.id, productId: product.id },
            ]);
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

    return (
        <div className="max-w-[1200px] mx-auto pt-32">
            <div className="flex flex-col md:flex-row gap-6 mb-12">
                <div className="flex-1">
                    <div className="w-full max-w-md mx-auto">
                        {product.urls?.length > 0 ? (
                            <ImageSlider images={product.urls} />
                        ) : (
                            <Skeleton variant="rectangular" width={370} height={370} />
                        )}
                    </div>
                </div>

                <div className="flex-1 space-y-4 mx-auto sm:px-2">
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
                        <p className="text-sm text-gray-600">Còn {product.quantity} sản phẩm</p>
                        <span className="text-gray-400">•</span>
                        <p className="text-sm text-gray-600">Đã bán {product.sold}</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <CountNumber
                            product={product}
                            quantity={product?.count || 1}
                            onUpdateQuantity={(id, qty) => setProduct((prev) => ({ ...prev, count: qty }))}
                        />
                        <Button handle={handlePurchase} rouded title="MUA HÀNG" />
                    </div>
                </div>
            </div>

            <div
                className="px-12 whitespace-pre-line text-gray-700 text-xl leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.descriptionDetail }}
            ></div>

            <div className="bg-white w-full p-8 my-8">
                <h2 className="uppercase">Đánh giá sản phẩm</h2>
                <div className="flex flex-col md:flex-row items-center md:items-center mt-8 mb-12 gap-6">
                    <div className="flex flex-col items-center justify-center w-full h-full md:w-1/4">
                        <span className="text-5xl font-semibold text-red-500">
                            {revenueRating.starAverage?.toFixed(2)}
                        </span>
                        <span className="text-red-500 text-lg font-medium">
                            {getRatingDescription(revenueRating.starAverage)}
                        </span>
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
                        <ItemFeedback
                            key={index}
                            refetchListFeedback={refetchListFeedback}
                            product={product}
                            feedback={feedback}
                        />
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
                {chooseAddComment && (
                    <ReviewForm
                        onSubmit={({ rating, content, mediaFiles }) => handleAddReview(rating, content, mediaFiles)}
                    />
                )}
            </div>

            <div className="p-8">
                <MenuProductRecommender
                    title="Các sản phẩm liên quan"
                    loading={loading}
                    allProducts={allProducts}
                    setAllProducts={setAllProducts}
                />
            </div>
        </div>
    );
};

export default ProductDetail;
