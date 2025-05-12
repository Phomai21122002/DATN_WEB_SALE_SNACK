import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import routes from '~/config/routes';
import { AdminUpdateCategory, GetCategory } from '~/services/Category';
import noImage from '~/assets/images/No-image.png';
import { uploadMediaToCloudinary } from '../CreateProduct/Constant';
import AddIcon from '@mui/icons-material/Add';

function UpdateCategory() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    useEffect(() => {
        const getCategory = async () => {
            try {
                const res = await GetCategory({ categoryId: id });
                setImages(res.imageCategories?.map((img) => ({ url: img.url })) || []);
                reset({
                    id: res.id,
                    name: res.name,
                    description: res.description,
                });
            } catch (err) {
                console.error('Error fetching categories: ', err);
            }
        };
        getCategory();
    }, [id, reset]);

    const handleUpdateCategory = async (data) => {
        const category = {
            ...data,
            urls: images.map((img) => img.url),
        };
        try {
            await AdminUpdateCategory(category.id, category);
            navigate(routes.adminListCategory);
        } catch (err) {
            console.error('Error saving product:', err);
        }
    };

    const onSubmit = (data) => {
        if (images.length === 0) {
            alert('Vui lòng chọn ít nhất một hình ảnh');
            return;
        }
        handleUpdateCategory(data);
        reset();
    };

    const handleBack = () => {
        reset();
        navigate(routes.adminListCategory);
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
                        placeholder="Nhập mô tả sản phẩm"
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
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

export default UpdateCategory;
