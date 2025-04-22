import { useForm } from 'react-hook-form';
import { uploadImageToCloudinary } from './Constant';
import { useEffect, useState } from 'react';
import { GetCategories } from '~/services/Category';
import { Categories } from '~/components/MenuCategory/Constains';
import { AddProduct } from '~/services/Product';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';

function CreateProduct() {
    const [previewImages, setPreviewImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const getAllCategory = async () => {
            try {
                const res = await GetCategories();
                const resultRes = Categories(res.data);
                setCategories(resultRes);
            } catch (err) {
                console.error('Error fetching categories: ', err);
            }
        };
        getAllCategory();
    }, []);

    const handleImageChange = async (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const previews = [];
            const uploadedUrls = [];
            for (const file of files) {
                previews.push(URL.createObjectURL(file));
                try {
                    const uploadedUrl = await uploadImageToCloudinary(file);
                    if (uploadedUrl) uploadedUrls.push(uploadedUrl);
                } catch (err) {
                    console.error('Error uploading image:', err);
                }
            }
            setPreviewImages(previews);
            setImageUrls(uploadedUrls);
        }
    };

    const handleSaveProduct = async (product) => {
        const { images, category, ...productWithoutImages } = product;
        const productWithImages = {
            product: {
                ...productWithoutImages,
                price: parseFloat(product.price),
                quantity: parseInt(product.quantity),
                categoryId: parseInt(category),
                expiryDate: new Date(product.expiryDate).toISOString(),
            },
            imageDtos: imageUrls.map((url) => ({
                // id: 0,
                url: url,
                description: product.name,
            })),
        };

        try {
            await AddProduct(productWithImages);
            navigate(routes.adminListProduct);
        } catch (err) {
            console.error('Error saving product:', err);
        }
    };

    const onSubmit = (data) => {
        handleSaveProduct(data);
        reset();
        setPreviewImages([]);
        setImageUrls([]);
    };

    return (
        <div className="bg-white p-4 shadow-md rounded-lg overflow-hidden">
            <h2 className="text-xl font-bold mb-4">Thêm Sản Phẩm</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-bold mb-1">Tên sản phẩm</label>
                    <input
                        type="text"
                        className="w-full text-sm p-2 border rounded-md"
                        {...register('name', { required: 'Tên sản phẩm là bắt buộc' })}
                        placeholder="Nhập tên sản phẩm"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Loại sản phẩm</label>
                    <select
                        className="w-full text-sm p-2 border rounded-md"
                        {...register('category', { required: 'Vui lòng chọn loại sản phẩm' })}
                    >
                        <option value="">Chọn loại sản phẩm</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Mô tả sản phẩm</label>
                    <textarea
                        className="w-full text-sm p-2 border rounded-md min-h-[100px]"
                        {...register('description', { required: 'Mô tả sản phẩm là bắt buộc' })}
                        placeholder="Nhập mô tả sản phẩm"
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Ngày hết hạn</label>
                    <input
                        type="date"
                        className="max-w-[200px] text-sm p-2 border rounded-md"
                        {...register('expiryDate', { required: 'Ngày hết hạn là bắt buộc' })}
                    />
                    {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Số lượng sản phẩm</label>
                    <input
                        type="number"
                        className="w-full text-sm p-2 border rounded-md"
                        {...register('quantity', {
                            required: 'Số lượng là bắt buộc',
                            min: { value: 1, message: 'Số lượng phải lớn hơn 0' },
                        })}
                        placeholder="Số lượng sản phẩm"
                    />
                    {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Giá sản phẩm (VNĐ)</label>
                    <input
                        type="number"
                        className="w-full text-sm p-2 border rounded-md"
                        {...register('price', {
                            required: 'Giá sản phẩm là bắt buộc',
                            min: { value: 0, message: 'Giá sản phẩm phải lớn hơn hoặc bằng 0' },
                        })}
                        placeholder="Giá sản phẩm"
                    />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Hình ảnh sản phẩm</label>
                    <input
                        type="file"
                        className="w-full text-sm"
                        {...register('images', { required: 'Vui lòng chọn ít nhất một hình ảnh' })}
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}
                </div>

                {previewImages.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-2">
                        {previewImages.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`preview-${index}`}
                                className="w-full h-32 object-cover border rounded-md"
                            />
                        ))}
                    </div>
                )}

                <button type="submit" className="bg-blue-500 text-sm text-white p-2 rounded-md hover:bg-blue-600">
                    Lưu sản phẩm
                </button>
            </form>
        </div>
    );
}

export default CreateProduct;
