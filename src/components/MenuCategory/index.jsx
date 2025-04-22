import { useEffect, useState } from 'react';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { GetCategories } from '~/services/Category';
import noImage from '~/assets/images/No-image.png';
import { Categories } from './Constains';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';

function MenuCategory() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getAllCategory = async () => {
            try {
                const res = await GetCategories();
                const resultRes = Categories(res.data);
                setCategories(resultRes);
            } catch (err) {
                console.error('Error fetching category data: ', err);
            }
        };
        getAllCategory();
    }, []);

    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsToShow = 8;
    const hasNext = currentIndex + itemsToShow < categories?.length;
    const hasPrev = currentIndex > 0;

    const nextCategory = () => {
        if (hasNext) {
            setCurrentIndex((prevIndex) => prevIndex + itemsToShow);
        }
    };

    const prevCategory = () => {
        if (hasPrev) {
            setCurrentIndex((prevIndex) => prevIndex - itemsToShow);
        }
    };

    return (
        <div className="py-4">
            <div className="flex text-xl font-semibold mb-4 uppercase">Nhóm hàng mới nhất</div>
            <div className="relative">
                {hasPrev && (
                    <button
                        onClick={prevCategory}
                        className="absolute left-[-10px] top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full hover:outline-none hover:ring-2 hover:ring-blue-500 transition-all z-[10]"
                    >
                        <ArrowBack />
                    </button>
                )}
                <div className="overflow-hidden">
                    <div className="grid grid-cols-8 gap-4 transition-all duration-500 p-1">
                        {categories.slice(currentIndex, currentIndex + itemsToShow).map((category) => (
                            <Link
                                to={`${routes.search.replace('/:id', '')}/${category.id}`}
                                key={category?.id}
                                className="cursor-pointer"
                            >
                                <div className="relative w-full h-[100px] overflow-hidden rounded-[100%]">
                                    <img
                                        src={category.url || noImage}
                                        alt={category.name}
                                        className="w-full h-full object-cover transform transition-all duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="text-center mt-2 text-sm font-semibold">{category.name}</h3>
                                <p className="text-center text-[12px] text-gray-600">{category.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
                {hasNext && (
                    <button
                        onClick={nextCategory}
                        className="absolute right-[-10px] top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full hover:outline-none hover:ring-2 hover:ring-blue-500 transition-all z-[10]"
                    >
                        <ArrowForward />
                    </button>
                )}
            </div>
        </div>
    );
}

export default MenuCategory;
