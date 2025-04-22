export const Categories = (categories) => {
    return categories.map((category) => ({
        ...category?.imageDto,
        ...category?.categoryDto,
        productCount: category?.productCount,
    }));
};
