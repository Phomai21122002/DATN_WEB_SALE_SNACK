export const updatedProducts = (products) =>
    products.map((product) => ({
        ...product,
        product: {
            ...product.product,
            count: 1,
        },
    }));
