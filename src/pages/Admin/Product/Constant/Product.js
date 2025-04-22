export const updatedProducts = (products) => {
    return products.map((product) => {
        const formattedExpiryDate = new Date(product?.product?.expiryDate).toLocaleDateString('vi-VN');
        const formattedCreateDate = new Date(product?.product?.createdAt).toLocaleDateString('vi-VN');

        return {
            ...product?.imageDtos[0],
            ...product?.product,
            expiryDate: formattedExpiryDate,
            createdAt: formattedCreateDate,
        };
    });
};

export const listTitle = ['STT', 'Ảnh sản phẩm', 'Tên sản phẩm', 'Số lượng', 'Giá', 'Hạng sử dụng', 'Điều chỉnh'];
