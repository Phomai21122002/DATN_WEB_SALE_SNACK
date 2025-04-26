export const updatedProducts = (products) =>
    products.map((product) => ({
        ...product,
        count: 1,
    }));

export const updatedCategories = (Categories) =>
    Categories.map((category) => ({
        ...category.categoryDto,
    }));
