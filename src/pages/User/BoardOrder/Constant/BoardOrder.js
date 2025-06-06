import BoardOrderConfirm from '../BoardOrderConfirm';
import BoardOrderProduct from '../BoardOrderProduct';

export const orderTabs = [
    { label: 'Tất cả', value: 0, Component: (props) => <BoardOrderProduct {...props} /> },
    {
        label: 'Chờ xác nhận',
        value: 1,
        Component: (props) => <BoardOrderConfirm {...props} />,
    },
    {
        label: 'Chờ giao hàng',
        value: 2,
        Component: (props) => <BoardOrderConfirm {...props} />,
    },
    {
        label: 'Hoàn thành',
        value: 3,
        Component: (props) => <BoardOrderConfirm {...props} />,
    },
    { label: 'Đã hủy', value: 4, Component: (props) => <BoardOrderProduct {...props} /> },
];

export const listTitleOrder = [
    'Mã đơn hàng',
    'Tên người dùng',
    'Số điện thoại',
    'Số lượng',
    'Số tiền',
    'Ngày đặt hàng',
    'Trạng thái',
];

export const listTitleProduct = ['Hình ảnh', 'Tên sản phẩm', 'Giá tiền', 'Số lượng', 'Tổng tiền', 'Ngày đặt'];
