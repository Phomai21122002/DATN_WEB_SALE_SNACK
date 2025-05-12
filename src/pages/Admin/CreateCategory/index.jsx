import { useForm } from 'react-hook-form';
import { uploadMediaToCloudinary } from '../CreateProduct/Constant';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import { AddCategory } from '~/services/Category';
import noImage from '~/assets/images/No-image.png';

function CreateCategory() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);

    const handleSaveCategory = async (category) => {
        const newCategory = {
            name: category.name,
            description: category.description,
            urls: images.map((img) => img.url),
        };
        try {
            await AddCategory(newCategory);
            navigate(routes.adminListCategory);
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

    const onSubmit = (data) => {
        if (images.length === 0) {
            alert('Vui lòng chọn ít nhất một hình ảnh');
            return;
        }
        handleSaveCategory(data);
        reset();
    };

    const handleRemoveImage = (image) => {
        const newImages = images.filter((i) => i.url !== image.url);
        setImages(newImages);
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
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}
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

                <button type="submit" className="bg-blue-500 text-sm text-white p-2 rounded-md hover:bg-blue-600">
                    Lưu loại sản phẩm
                </button>
            </form>
        </div>
    );
}

export default CreateCategory;
