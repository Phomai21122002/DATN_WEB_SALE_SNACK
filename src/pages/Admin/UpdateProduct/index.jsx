import { Controller, useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { GetCategories } from '~/services/Category';
import { useNavigate, useParams } from 'react-router-dom';
import routes from '~/config/routes';
import { AdminUpdateProduct, GetProductBySlug } from '~/services/Product';
import AddIcon from '@mui/icons-material/Add';
import noImage from '~/assets/images/No-image.png';
import { uploadMediaToCloudinary } from '../CreateProduct/Constant';
import JoditEditor from 'jodit-react';

function UpdateProduct() {
    const { slug } = useParams();
    const editor = useRef(null);
    const config = {
        placeholder: 'Nhập mô tả chi tiết về sản phẩm...',
    };
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const getAllCategory = async () => {
            try {
                const res = await GetCategories();
                setCategories(res);
                const resProduct = await GetProductBySlug({ slug });
                setImages(resProduct.urls?.map((img) => ({ url: img })) || []);
                const formattedExpiryDate = resProduct.expiryDate
                    ? new Date(resProduct.expiryDate).toLocaleDateString('en-CA')
                    : '';
                reset({
                    id: resProduct.id,
                    name: resProduct.name,
                    categoryId: resProduct.category?.id,
                    description: resProduct.description,
                    descriptionDetail: resProduct.descriptionDetail,
                    expiryDate: formattedExpiryDate,
                    quantity: resProduct.quantity,
                    price: resProduct.price,
                });
            } catch (err) {
                console.error('Error fetching categories: ', err);
            }
        };
        getAllCategory();
    }, [slug, reset]);

    const handleUpdateProduct = async (product) => {
        const { categoryId, id, ...prevProduct } = product;
        const updateProduct = {
            ...prevProduct,
            expiryDate: new Date(prevProduct.expiryDate).toISOString(),
            quantity: Number(prevProduct.quantity),
            price: Number(prevProduct.price),
            tag: '',
            urls: images.map((img) => img.url),
        };
        try {
            await AdminUpdateProduct(id, categoryId, updateProduct);
            navigate(routes.adminListProduct);
        } catch (err) {
            console.error('Error saving product:', err);
        }
    };

    const handleImageChange = async (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const newImages = [];
            for (const file of files) {
                try {
                    const uploadedUrl = await uploadMediaToCloudinary(file);
                    if (uploadedUrl) newImages.push({ url: uploadedUrl });
                } catch (err) {
                    console.error('Error uploading image:', err);
                }
            }
            setImages((prev) => [...prev, ...newImages]);
        }
    };

    const handleRemoveImage = (image) => {
        const newImages = images.filter((i) => i.url !== image.url);
        setImages(newImages);
    };

    const onSubmit = (data) => {
        if (images.length === 0) {
            alert('Vui lòng chọn ít nhất một hình ảnh');
            return;
        }
        handleUpdateProduct(data);
    };
    const handleBack = () => {
        reset();
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
                        {...register('categoryId', { required: 'Vui lòng chọn loại sản phẩm' })}
                    >
                        <option value="">Chọn loại sản phẩm</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId.message}</p>}
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
                    <label className="block text-sm font-bold mb-1">Mô tả chi tiết sản phẩm</label>
                    <Controller
                        control={control}
                        name="descriptionDetail"
                        rules={{ required: 'Mô tả về chi tiết sản phẩm là bắt buộc' }}
                        render={({ field }) => (
                            <JoditEditor
                                ref={editor}
                                value={field.value}
                                config={config}
                                onBlur={field.onBlur}
                                onChange={(newContent) => field.onChange(newContent)}
                            />
                        )}
                    />
                    {errors.descriptionDetail && (
                        <p className="text-red-500 text-sm">{errors.descriptionDetail.message}</p>
                    )}
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

                <div className="mt-4">
                    <div className="flex items-center justify-between mb-4">
                        <label className="block text-sm font-bold mb-1">Danh sách hình ảnh</label>
                        <label
                            htmlFor="imageUpload"
                            className="cursor-pointer inline-block bg-yellow-300 text-white text-sm px-2 py-1 rounded hover:bg-yellow-400 transition"
                        >
                            <AddIcon />
                        </label>
                        <input
                            id="imageUpload"
                            type="file"
                            className="hidden"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                        {images.map((image, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={image.url || noImage}
                                    alt={`preview ${index}`}
                                    className="w-full h-32 object-cover border rounded-md"
                                />
                                <button
                                    type="button"
                                    className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                                    onClick={() => handleRemoveImage(image)}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>

                    {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>}
                </div>

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
