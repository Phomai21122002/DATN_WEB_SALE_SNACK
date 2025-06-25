export const listTitle = [
    'STT',
    'Ảnh loại sản phẩm',
    'Loại sản phẩm',
    'Mô tả loại sản phẩm',
    'Số sản phẩm',
    'Điều chỉnh',
];

export const sortDate = [
    { id: 1, name: 'Tên loại sản phẩm' },
    { id: 2, name: 'Số lượng sản phẩm tăng dần' },
    { id: 3, name: 'Số lượng sản phẩm giảm dần' },
];

export const removeVietnameseTones = (str) => {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
};
