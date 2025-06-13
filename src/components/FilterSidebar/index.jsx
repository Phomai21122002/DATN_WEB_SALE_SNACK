import { memo } from 'react';
import { FilterList } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';

function FilterSidebar({ categories, selectedCategory, minPrice, setMinPrice, maxPrice, setMaxPrice }) {
    const navigate = useNavigate();
    const handleCategoryChange = (event) => {
        navigate(`${routes.categoryDetail.replace(':id', event.target.value)}`);
    };
    return (
        <>
            <div className="font-semibold text-lg mb-6 flex items-center">
                <FilterList className="mr-2 text-gray-500" /> Bộ lọc tìm kiếm
            </div>

            <div className="mb-6">
                <div className="text-sm font-medium mb-2">Theo Danh Mục</div>
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                >
                    <option value={0}>Chọn loại sản phẩm</option>
                    {categories &&
                        categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                </select>
            </div>

            <div className="mb-6">
                <div className="text-sm font-medium mb-2">Theo Giá</div>
                <div className="flex justify-between text-xs">
                    <input
                        type="number"
                        className="w-1/2 p-2 border border-gray-300 rounded"
                        placeholder="Từ"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <span className="mx-1">-</span>
                    <input
                        type="number"
                        className="w-1/2 p-2 border border-gray-300 rounded"
                        placeholder="Đến"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>
            </div>
        </>
    );
}

export default memo(FilterSidebar);
