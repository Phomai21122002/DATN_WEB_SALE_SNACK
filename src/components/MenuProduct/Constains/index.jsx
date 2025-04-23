export const updatedProducts = (products) =>
    products.map((product) => ({
        ...product,
        count: 1,
    }));
