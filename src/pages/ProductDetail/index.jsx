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
import Image from '~/components/Image';
import { uploadMediaToCloudinary } from '../Admin/CreateProduct/Constant';
import { CreateFeedBack } from '~/services/Feedback';
import useGetFeedBacks from '~/hooks/useGetFeedBacks';
import { useQueryClient } from '@tanstack/react-query';
import { EQueryKeys } from '~/constants';

function ProductDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { userData } = useStorage();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);

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

    const { data: feedbacks } = useGetFeedBacks({ userId: userData.id, productId: product.id });

    const [reviewContent, setReviewContent] = useState('');
    const [reviewMedia, setReviewMedia] = useState([]);
    const [chooseAddComment, setChooseAddComment] = useState(false);

    const handleMediaUpload = async (e) => {
        const files = Array.from(e.target.files);
        for (const file of files) {
            try {
                const uploadedUrl = await uploadMediaToCloudinary(file);
                if (uploadedUrl) {
                    setReviewMedia((prev) => [...prev, uploadedUrl]);
                }
            } catch (err) {
                console.error('Error uploading file:', err);
            }
        }
    };
    const handleRemoveMedia = (index) => {
        setReviewMedia((prev) => prev.filter((_, i) => i !== index));
    };
    const handleAddReview = async () => {
        try {
            await CreateFeedBack(userData.id, {
                productId: product?.id,
                content: reviewContent,
                urls: reviewMedia,
            });
            queryClient.invalidateQueries({
                queryKey: [EQueryKeys.GET_LIST_FEEDBACK, { userId: userData.id, productId: product.id }],
            });
            setReviewContent('');
            setReviewMedia([]);
            setChooseAddComment((prev) => !prev);
        } catch (error) {
            console.log(error);
        }
    };

    const updateQuantity = (id, newQuantity) => {
        setProduct((prevProducts) => ({ ...prevProducts, count: newQuantity }));
    };

    const handlePurchase = async (productId, quantity) => {
        console.log(productId, quantity, userData);
        if (userData && Object.keys(userData).length > 0) {
            const res = await AddCart({
                quantity: quantity,
                userId: userData?.id,
                productId: productId,
            });
            res &&
                queryClient.invalidateQueries({
                    queryKey: [EQueryKeys.GET_LIST_CART, userData?.id],
                });
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
                {feedbacks &&
                    feedbacks.map((feedback, index) => (
                        <div key={index} className="mt-6 border-b-2 border-gray-300">
                            <div className="flex items-center">
                                <img
                                    className="w-16 h-16 rounded-full"
                                    src={feedback.user.url || noImage}
                                    alt="avatar"
                                />
                                <div className="mx-4 text-xl">
                                    <h4>{feedback.user.firstName + ' ' + feedback.user.lastName}</h4>
                                    <p className="text-gray-500">{feedback.createdAt}</p>
                                </div>
                            </div>
                            <div className="mx-4 my-2">
                                <p className="whitespace-pre-line text-justify py-4">{feedback.content}</p>
                                {feedback.imageFeedBacks?.length > 0 && (
                                    <div className="flex items-center flex-wrap py-2 gap-4">
                                        {feedback.imageFeedBacks.map((url, i) =>
                                            url.url.match(/.(mp4|webm)$/) ? (
                                                <video key={i} controls className="w-64 h-36">
                                                    <source src={url.url} type="video/mp4" />
                                                </video>
                                            ) : (
                                                <Image
                                                    key={i}
                                                    src={url.url}
                                                    alt={`review-${i}`}
                                                    className="w-36 h-36 object-cover"
                                                />
                                            ),
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                <span
                    onClick={() => setChooseAddComment((prev) => !prev)}
                    className="flex justify-end my-8 cursor-pointer text-xl hover:text-blue-500"
                >
                    Thêm đánh giá
                </span>
                {chooseAddComment && (
                    <div className="bg-white w-full p-8 mt-8">
                        <h2 className="uppercase mb-4">Đánh giá của bạn</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleAddReview();
                            }}
                            className="space-y-4"
                        >
                            <h4 className="text-xl">Mức độ đánh giá *</h4>
                            <div>ngôi sao</div>
                            <h4 className="text-xl">Nhận xét của bạn *</h4>
                            <textarea
                                placeholder="Nội dung đánh giá"
                                className="border text-xl p-2 w-full rounded"
                                rows={4}
                                value={reviewContent}
                                onChange={(e) => setReviewContent(e.target.value)}
                                required
                            />
                            <h4 className="text-xl">Tải thêm hình ảnh hoặc video *</h4>
                            <input
                                type="file"
                                accept="image/*,video/*"
                                multiple
                                onChange={(e) => handleMediaUpload(e)}
                            />
                            {reviewMedia.length > 0 && (
                                <div className="flex gap-4 flex-wrap">
                                    {reviewMedia.map((url, index) =>
                                        url.match(/.(mp4|webm)$/) ? (
                                            <video key={index} controls className="w-32 h-32">
                                                <source src={url} type="video/mp4" />
                                            </video>
                                        ) : (
                                            <div key={index} className="relative">
                                                <Image src={url} className="w-32 h-32 object-cover rounded" />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveMedia(index)}
                                                    className="absolute top-0 right-0 text-red-500"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ),
                                    )}
                                </div>
                            )}

                            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded">
                                Gửi đánh giá
                            </button>
                        </form>
                    </div>
                )}
            </div>
            <MenuProduct title={'Các sản phẩm liên quan'} />
        </div>
    );
}

export default ProductDetail;
