export const getOrderStatusText = (status) => {
    switch (status) {
        case 1:
            return 'Chờ xử lý';
        case 2:
            return 'Đang xử lý';
        case 3:
            return 'Hoàn tất';
        case 4:
            return 'Đã hủy';
        default:
            return 'Không xác định';
    }
};

export const getOrderStatusStyle = (status) => {
    switch (status) {
        case 1:
            return 'bg-yellow-200 text-yellow-800'; // Chờ xử lý
        case 2:
            return 'bg-blue-200 text-blue-800'; // Đang xử lý
        case 3:
            return 'bg-green-200 text-green-800'; // Hoàn tất
        case 4:
            return 'bg-red-200 text-red-800'; // Đã hủy
        default:
            return 'bg-gray-200 text-gray-800'; // Không xác nhận
    }
};
