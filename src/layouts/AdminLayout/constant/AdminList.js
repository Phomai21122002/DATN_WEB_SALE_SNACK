import DifferenceOutlinedIcon from '@mui/icons-material/DifferenceOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
import PlaylistRemoveOutlinedIcon from '@mui/icons-material/PlaylistRemoveOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import routes from '~/config/routes';
export const ToDoList = () => [
    {
        title: 'Sản phẩm',
        list: [
            {
                icon: <DifferenceOutlinedIcon fontSize="small" />,
                title: 'Thêm sản phẩm',
                path: routes.adminProduct,
            },
            {
                icon: <ReceiptLongOutlinedIcon fontSize="small" />,
                title: 'Danh sách sản phẩm',
                path: routes.adminListProduct,
            },
        ],
    },
    {
        title: 'Loại sản phẩm',
        list: [
            {
                icon: <PlaylistAddOutlinedIcon fontSize="small" />,
                title: 'Thêm loại sản phẩm',
                path: routes.adminCategory,
            },
            {
                icon: <ReceiptLongOutlinedIcon fontSize="small" />,
                title: 'Danh sách loại sản phẩm',
                path: routes.adminListCategory,
            },
        ],
    },
    {
        title: 'Đặt hàng',
        list: [
            {
                icon: <BallotOutlinedIcon fontSize="small" />,
                title: 'Danh sách xác nhận đơn hàng',
                path: routes.adminListConfirmOrder,
            },
            {
                icon: <PlaylistRemoveOutlinedIcon fontSize="small" />,
                title: 'Danh sách hủy bỏ đơn hàng',
                path: routes.adminListCancelOrder,
            },
            {
                icon: <PaymentsOutlinedIcon fontSize="small" />,
                title: 'Danh sách hóa đơn',
                path: routes.adminListBill,
            },
        ],
    },
    {
        title: 'Báo cáo thống kê',
        list: [
            {
                icon: <PaymentsOutlinedIcon fontSize="small" />,
                title: 'Doanh thu',
                path: routes.adminRevenue,
            },
        ],
    },
    {
        title: 'Danh sách Người Dùng',
        list: [
            {
                icon: <AccountCircleIcon fontSize="small" />,
                title: 'Khách hàng',
                path: routes.adminListUser,
            },
        ],
    },
];

export const UserItems = () => [
    {
        icon: <DescriptionOutlinedIcon fontSize="small" />,
        title: 'Danh sách đặt hàng',
        path: routes.admin,
    },
];
