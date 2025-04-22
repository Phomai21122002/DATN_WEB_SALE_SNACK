import HeaderTable from '~/components/HeaderTabel';
import { listTitle, sortDate } from './Constant';
import SearchSortListOfAdmin from '~/components/SearchSortListOfAdmin';
import { GetCategories } from '~/services/Category';
import { Categories } from '~/components/MenuCategory/Constains';
import { useEffect, useState } from 'react';
import noImage from '~/assets/images/No-image.png';
import routes from '~/config/routes';
import { useNavigate } from 'react-router-dom';

function Category() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [allcategories, setAllCategories] = useState([]);

    useEffect(() => {
        const getAllCategory = async () => {
            try {
                const res = await GetCategories();
                const resultRes = Categories(res.data);
                setCategories(resultRes);
                setAllCategories(resultRes);
            } catch (err) {
                console.error('Error fetching category data: ', err);
            }
        };
        getAllCategory();
    }, []);

    const editOrder = (id) => {
        navigate(routes.adminUpdateCategory.replace(':id', id));
    };
    const deleteOrder = async (id) => {
        console.log('Deleting order', id);
        // try {
        //     await AdminDeleteProduct(id);
        //     setCategories((prev) => prev.filter((category) => category.id !== id));
        // } catch (error) {
        //     console.error('Error fetching category data: ', error);
        // }
    };

    const handleSortChange = (id) => {
        if (Number(id) === 1) {
            setCategories(() => [...allcategories].sort((a, b) => a.name.localeCompare(b.name)));
        } else if (Number(id) === 2) {
            setCategories(() => [...allcategories].sort((a, b) => a.productCount - b.productCount));
        } else if (Number(id) === 3) {
            setCategories(() => [...allcategories].sort((a, b) => b.productCount - a.productCount));
        } else {
            setCategories(allcategories);
        }
    };

    const handleSearchProduct = (title) => {
        title
            ? setCategories(() =>
                  allcategories.filter((category) => category.name.toLowerCase().includes(title.toLowerCase())),
              )
            : setCategories(allcategories);
    };
    return (
        <>
            <SearchSortListOfAdmin
                title={'Chọn loại sắp xếp'}
                categories={sortDate}
                onSortChange={handleSortChange}
                onSearch={handleSearchProduct}
            />
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full text-left text-sm">
                    <HeaderTable listTitle={listTitle} />
                    <tbody>
                        {categories?.map((category, index) => (
                            <tr key={category.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-6">{index + 1}</td>
                                <td className="py-3 px-6">
                                    {category.url && (
                                        <img
                                            src={category.url || noImage}
                                            alt={`category-${category.id}`}
                                            className="w-16 h-16 object-cover rounded-md"
                                        />
                                    )}
                                </td>
                                <td className="py-3 px-6">{category.name}</td>
                                <td className="py-3 px-6">{category.productCount}</td>
                                <td className="py-3 px-6">
                                    <button
                                        className="text-blue-600 hover:underline mr-2"
                                        onClick={() => editOrder(category.id)}
                                    >
                                        Chỉnh sửa
                                    </button>
                                    <button
                                        className="text-red-600 hover:underline"
                                        onClick={() => deleteOrder(category.id)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {categories.length === 0 && <div className="text-center py-6 text-gray-500">Không có đơn hàng nào</div>}
            </div>
        </>
    );
}

export default Category;
