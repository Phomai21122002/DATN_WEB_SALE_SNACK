import { useForm } from 'react-hook-form';
import { uploadImageToCloudinary } from '../CreateProduct/Constant';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import { AddCategory } from '~/services/Category';

function CreateCategory() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [previewImages, setPreviewImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    const handleSaveCategory = async (category) => {
        const { images, descriptionImg, ...categoryWithoutImages } = category;
        const categoryWithImages = {
            ...categoryWithoutImages,
            imageDto: {
                // id: 0,
                url: imageUrls[0],
                description: descriptionImg,
            },
        };
        try {
            await AddCategory(categoryWithImages);
            navigate(routes.adminListCategory);
        } catch (err) {
            console.error('Error saving product:', err);
        }
    };

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

    const onSubmit = (data) => {
        handleSaveCategory(data);
        reset();
    };
    return (
        <div className="bg-white p-4 shadow-md rounded-lg overflow-hidden">
            <h2 className="text-xl font-bold mb-4">Thêm Loại Sản Phẩm</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-bold mb-1">Loại sản phẩm</label>
                    <input
                        type="text"
                        className="w-full text-sm p-2 border rounded-md"
                        {...register('name', { required: 'Loại sản phẩm là bắt buộc' })}
                        placeholder="Nhập loại sản phẩm"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Mô tả loại sản phẩm</label>
                    <textarea
                        className="w-full text-sm p-2 border rounded-md min-h-[100px]"
                        {...register('description', { required: 'Mô tả loại sản phẩm là bắt buộc' })}
                        placeholder="Nhập mô tả loại sản phẩm"
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Hình ảnh loại sản phẩm</label>
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

                <div>
                    <label className="block text-sm font-bold mb-1">Mô tả hình ảnh</label>
                    <textarea
                        className="w-full text-sm p-2 border rounded-md min-h-[100px]"
                        {...register('descriptionImg', { required: 'Mô tả hình ảnh là bắt buộc' })}
                        placeholder="Nhập mô tả hình ảnh"
                    ></textarea>
                    {errors.descriptionImg && <p className="text-red-500 text-sm">{errors.descriptionImg.message}</p>}
                </div>

                <button type="submit" className="bg-blue-500 text-sm text-white p-2 rounded-md hover:bg-blue-600">
                    Lưu loại sản phẩm
                </button>
            </form>
        </div>
    );
}

export default CreateCategory;
