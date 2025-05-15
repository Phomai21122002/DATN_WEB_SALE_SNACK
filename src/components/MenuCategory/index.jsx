import { useState } from 'react';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import noImage from '~/assets/images/No-image.png';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import useGetCategories from '~/hooks/useGetCategories';
import SkeletonCategory from '../SkeletonCategory';

function MenuCategory() {
    const { data, isLoading } = useGetCategories();

    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsToShow = 8;
    const hasNext = currentIndex + itemsToShow < data?.length;
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
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 transition-all duration-500 p-1">
                        {isLoading
                            ? Array.from({ length: itemsToShow }).map((_, index) => <SkeletonCategory key={index} />)
                            : data &&
                              data?.slice(currentIndex, currentIndex + itemsToShow).map((category) => (
                                  <Link
                                      to={`${routes.search.replace('/:id', '')}/${category.id}`}
                                      key={category?.id}
                                      className="cursor-pointer"
                                  >
                                      <div className="relative w-full h-[100px] overflow-hidden rounded-[100%]">
                                          <img
                                              src={category.imageCategories[0].url || noImage}
                                              alt={category.name}
                                              className="w-full h-full object-cover transform transition-all duration-300 group-hover:scale-105"
                                          />
                                      </div>
                                      <h3 className="text-center mt-2 text-sm font-semibold">{category.name}</h3>
                                      <p className="text-center text-[12px] text-gray-600 line-clamp-2 overflow-hidden">
                                          {category.description}
                                      </p>
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
