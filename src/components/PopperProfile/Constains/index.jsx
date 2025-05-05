import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import routes from '~/config/routes';
export const options = [
    { label: 'Quản trị viên', link: routes.admin, icon: <DashboardIcon fontSize="small" /> },
    { label: 'Thông tin cá nhân', link: routes.adminProfile, icon: <AccountCircleIcon fontSize="small" /> },
    { label: 'Thay đổi mật khẩu', link: routes.adminChangePass, icon: <LockIcon fontSize="small" /> },
    { label: 'Đăng xuất', link: routes.login, icon: <ExitToAppIcon fontSize="small" /> },
];

export const optionsUser = [
    { label: 'Thông tin cá nhân', link: routes.userProfile, icon: <AccountCircleIcon fontSize="small" /> },
    { label: 'Thay đổi mật khẩu', link: routes.userChangePass, icon: <LockIcon fontSize="small" /> },
    { label: 'Đơn đặt hàng', link: routes.userListOrder, icon: <ReceiptIcon fontSize="small" /> },
    { label: 'Hóa đơn', link: routes.userListBill, icon: <ReceiptIcon fontSize="small" /> },
    { label: 'Đăng xuất', link: routes.login, icon: <ExitToAppIcon fontSize="small" /> },
];
