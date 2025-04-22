import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import routes from '~/config/routes';
import { AdminUpdateCategory, GetCategory } from '~/services/Category';
import { Category } from './Constains';
import noImage from '~/assets/images/No-image.png';

function UpdateCategory() {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    const watchImage = watch('url', '');

    useEffect(() => {
        const getCategory = async () => {
            try {
                const res = await GetCategory({ id });
                const resultRes = Category(res);
                reset({
                    id: resultRes.id,
                    name: resultRes.name,
                    description: resultRes.description,
                    url: resultRes.url || '',
                });
            } catch (err) {
                console.error('Error fetching categories: ', err);
            }
        };
        getCategory();
    }, [id, reset]);

    const handleUpdateCategory = async (Category) => {
        const { url, ...categoryDB } = Category;
        try {
            await AdminUpdateCategory(id, categoryDB);
            navigate(routes.adminListCategory);
        } catch (err) {
            console.error('Error saving product:', err);
        }
    };

    const onSubmit = (data) => {
        handleUpdateCategory(data);
        reset();
    };

    const handleBack = () => {
        reset();
        navigate(routes.adminListCategory);
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
                <div className="mt-4 grid grid-cols-3 gap-2">
                    <img
                        src={watchImage || noImage}
                        alt={`preview`}
                        className="w-full h-32 object-cover border rounded-md"
                    />
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
