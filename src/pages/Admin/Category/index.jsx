import HeaderTable from '~/components/HeaderTabel';
import { listTitle, removeVietnameseTones, sortDate } from './Constant';
import SearchSortListOfAdmin from '~/components/SearchSortListOfAdmin';
import { GetCategories, GetSoftDeleteCategories } from '~/services/Category';
import { useEffect, useState } from 'react';
import noImage from '~/assets/images/No-image.png';
import routes from '~/config/routes';
import { useNavigate } from 'react-router-dom';
import SkeletonRow from '~/components/SkeletonRow';
import PopUpRemove from '~/components/PopUpRemove';

function Category() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [allcategories, setAllCategories] = useState([]);
    const [chooseRemove, setChooseRemove] = useState({});

    useEffect(() => {
        const getAllCategory = async () => {
            try {
                setIsLoading(true);
                const res = await GetCategories();
                console.log(res);
                setCategories(res);
                setAllCategories(res);
            } catch (err) {
                console.error('Error fetching category data: ', err);
            } finally {
                setIsLoading(false);
            }
        };
        getAllCategory();
    }, []);

    const editCategory = (id) => {
        navigate(routes.adminUpdateCategory.replace(':id', id));
    };
    const deleteCategory = async (category) => {
        try {
            await GetSoftDeleteCategories(category?.id);
            setCategories((prev) => prev.filter((c) => c.id !== category.id));
            setChooseRemove({});
        } catch (error) {
            console.error('Error fetching category data: ', error);
        }
    };

    const handleSortChange = (id) => {
        if (Number(id) === 1) {
            setCategories(() => [...allcategories].sort((a, b) => a.name.localeCompare(b.name)));
        } else if (Number(id) === 2) {
            setCategories(() => [...allcategories].sort((a, b) => a.countProduct - b.countProduct));
        } else if (Number(id) === 3) {
            setCategories(() => [...allcategories].sort((a, b) => b.countProduct - a.countProduct));
        } else {
            setCategories(allcategories);
        }
    };

    const handleSearchCategory = (title) => {
        const lowerTitle = removeVietnameseTones(title?.toLowerCase() || '');

        const filtered = lowerTitle
            ? allcategories.filter((category) => {
                  const name = removeVietnameseTones(category.name.toLowerCase());
                  return name.includes(lowerTitle);
              })
            : allcategories;

        setCategories(filtered);
    };

    return (
        <>
            <SearchSortListOfAdmin
                title={'Chọn loại sắp xếp'}
                categories={sortDate}
                onSortChange={handleSortChange}
                onSearch={handleSearchCategory}
            />
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full text-left text-sm">
                    <HeaderTable listTitle={listTitle} />
                    <tbody>
                        {isLoading ? (
                            Array.from({ length: 10 }).map((_, idx) => <SkeletonRow key={idx} col={listTitle.length} />)
                        ) : Array.isArray(categories) && categories.length > 0 ? (
                            categories.map((category, index) => {
                                return (
                                    <tr key={category.id} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-6">{index + 1}</td>
                                        <td className="py-3 px-6">
                                            {category.imageCategories.length > 0 && (
                                                <img
                                                    src={category.imageCategories[0].url || noImage}
                                                    alt={`category-${category.id}`}
                                                    className="w-16 h-16 object-cover rounded-md"
                                                />
                                            )}
                                        </td>
                                        <td className="py-3 px-6">{category.name}</td>
                                        <td className="py-3 px-6">
                                            <p className="line-clamp-3 max-w-xs overflow-hidden text-ellipsis">
                                                {category.description}
                                            </p>
                                        </td>
                                        <td className="py-3 px-6">{category.countProduct}</td>
                                        <td className="py-3 px-6">
                                            <button
                                                className="text-blue-600 hover:underline mr-2"
                                                onClick={() => editCategory(category.id)}
                                            >
                                                Chỉnh sửa
                                            </button>
                                            <button
                                                className="text-red-600 hover:underline"
                                                onClick={() => setChooseRemove(category)}
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={listTitle.length} className="text-center py-6 text-gray-500">
                                    Không có loại sản phẩm
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {chooseRemove && (
                <PopUpRemove
                    id={chooseRemove.id}
                    title={'Xóa loại sản phẩm'}
                    desc={`Bạn có chắc chắn muốn xóa loại sản phẩm ${chooseRemove?.name} này không?`}
                    onRemove={() => deleteCategory(chooseRemove)}
                    onClose={() => setChooseRemove({})}
                    isRemove={Object.keys(chooseRemove).length > 0}
                />
            )}
        </>
    );
}

export default Category;
