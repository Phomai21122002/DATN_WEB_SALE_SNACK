export const Category = (category) => {
    return {
        ...category?.imageDto,
        ...category?.categoryDto,
    };
};
