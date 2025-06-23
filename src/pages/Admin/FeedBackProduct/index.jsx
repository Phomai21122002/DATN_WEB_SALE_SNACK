import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStorage } from '~/Contexts';
import { GetProductBySlug } from '~/services/Product';
import useGetFeedBacks from '~/hooks/useGetFeedBacks';
import routes from '~/config/routes';
import ImageSlider from '~/components/ImageSlider';
import { Pagination, Skeleton } from '@mui/material';
import { convertRatingData, getRatingDescription } from '~/pages/ProductDetail/Constants';
import ItemFeedback from '~/components/ItemFeedback';

function FeedBackProduct() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { userData } = useStorage();

    const [product, setProduct] = useState({});
    const [page, setPage] = useState(1);

    useEffect(() => {
        const getProductById = async () => {
            try {
                const res = await GetProductBySlug({ slug });
                setProduct({ ...res, count: 1 });
            } catch (err) {
                console.log(err);
            }
        };
        getProductById();
    }, [slug]);

    const filterFeedbacks = useMemo(
        () => ({ userId: userData?.id, productId: product?.id, PageSize: 3, PageNumber: page }),
        // eslint-disable-next-line
        [page, userData?.id, product?.id],
    );
    const { data, refetchListFeedback } = useGetFeedBacks(filterFeedbacks);

    const feedbacks = useMemo(() => data?.datas?.[0]?.feedBacks ?? [], [data]);
    const revenueRating = useMemo(() => convertRatingData(data?.datas?.[0]), [data]);

    const totalCount = data?.totalCount || 0;
    const totalPages = useMemo(
        () => (totalCount ? Math.ceil(totalCount / data?.pageSize) : 0),
        [totalCount, data?.pageSize],
    );

    const handleBack = () => {
        navigate(routes.adminListProduct);
    };

    return (
        <div className="max-w-[1200px] mx-auto pt-6">
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
                <div className="flex justify-center my-6">
                    <Pagination page={page} count={totalPages} onChange={(_, val) => setPage(val)} color="primary" />
                </div>

                <button
                    type="button"
                    className="bg-gray-500 text-sm text-white p-2 rounded-md hover:bg-gray-600"
                    onClick={handleBack}
                >
                    Quay lại
                </button>
            </div>
        </div>
    );
}

export default FeedBackProduct;
