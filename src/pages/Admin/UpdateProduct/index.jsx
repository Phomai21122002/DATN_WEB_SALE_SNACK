import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { GetCategories } from '~/services/Category';
import { useNavigate, useParams } from 'react-router-dom';
import routes from '~/config/routes';
import { AdminUpdateProduct, GetProductBySlug } from '~/services/Product';
import { Categories } from '~/components/MenuCategory/Constains';

function UpdateProduct() {
    const { slug } = useParams();
    const [previewImages, setPreviewImages] = useState([]);
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
                const resProduct = await GetProductBySlug({ slug });
                setPreviewImages(resProduct.imageDtos.map((image) => image.url));
                reset({
                    id: resProduct.product.id,
                    name: resProduct.product.name,
                    category: resProduct.product.categoryId,
                    description: resProduct.product.description,
                    expiryDate: resProduct.product.expiryDate.slice(0, 10),
                    quantity: resProduct.product.quantity,
                    price: resProduct.product.price,
                });
            } catch (err) {
                console.error('Error fetching categories: ', err);
            }
        };
        getAllCategory();
    }, [slug, reset]);

    const handleUpdateProduct = async (product) => {
        const { images, category, ...productWithoutImages } = product;
        const productWithImages = {
            ...productWithoutImages,
            price: parseFloat(product.price),
            quantity: parseInt(product.quantity),
            categoryId: parseInt(category),
            expiryDate: new Date(product.expiryDate).toISOString(),
        };

        try {
            await AdminUpdateProduct(productWithImages);
            navigate(routes.adminListProduct);
        } catch (err) {
            console.error('Error saving product:', err);
        }
    };

    const onSubmit = (data) => {
        handleUpdateProduct(data);
        reset();
        setPreviewImages([]);
    };
    const handleBack = () => {
        reset();
        setPreviewImages([]);
        navigate(routes.adminListProduct);
    };
    return (
        <div className="bg-white p-4 shadow-md rounded-lg overflow-hidden">
            <h2 className="text-xl font-bold mb-4">Cập Nhật Sản Phẩm</h2>
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

                <div className="flex gap-4">
                    <button type="submit" className="bg-blue-500 text-sm text-white p-2 rounded-md hover:bg-blue-600">
                        Lưu thông tin
                    </button>
                    <button
                        type="button"
                        className="bg-gray-500 text-sm text-white p-2 rounded-md hover:bg-gray-600"
                        onClick={handleBack}
                    >
                        Quay lại
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateProduct;
