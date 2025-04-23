export const Categories = (categories) => {
    console.log('categories', categories);
    return categories.map((category) => ({
        ...category?.imageDto,
        ...category?.categoryDto,
        productCount: category?.productCount,
    }));
};
