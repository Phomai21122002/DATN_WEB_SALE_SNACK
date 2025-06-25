export const updatedProducts = (products) => {
    if (!Array.isArray(products) || products.length === 0) return [];

    return products.map((product) => {
        const expiryDateRaw = product?.expiryDate;
        const createdAtRaw = product?.createdAt;

        const expiryDate = expiryDateRaw ? new Date(expiryDateRaw) : null;
        const createdAt = createdAtRaw ? new Date(createdAtRaw) : new Date('2025-05-01');

        let usageDuration = 'Không xác định';

        if (expiryDate instanceof Date && !isNaN(expiryDate)) {
            const diffMs = expiryDate - createdAt;
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            const diffMonths = Math.floor(diffDays / 30);

            usageDuration = diffMonths >= 1 ? `${diffMonths} tháng` : `${diffDays} ngày`;
        }

        const imageDto = Array.isArray(product?.imageDtos) && product.imageDtos.length > 0 ? product.imageDtos[0] : {};

        return {
            ...imageDto,
            ...product,
            usageDuration,
        };
    });
};

export const listTitle = [
    'STT',
    'Ảnh sản phẩm',
    'Tên sản phẩm',
    'Mô tả sản phẩm',
    'Số lượng',
    'Giá',
    'Hạng sử dụng',
    'Điều chỉnh',
];
