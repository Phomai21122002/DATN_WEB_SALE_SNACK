import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import routes from '~/config/routes';
export const options = [
    { label: 'Admin', link: routes.admin, icon: <DashboardIcon fontSize="small" /> },
    { label: 'Profile', link: routes.adminProfile, icon: <AccountCircleIcon fontSize="small" /> },
    { label: 'Change Password', link: routes.adminChangePass, icon: <LockIcon fontSize="small" /> },
    { label: 'Sign Out', link: routes.login, icon: <ExitToAppIcon fontSize="small" /> },
];

export const optionsUser = [
    { label: 'Profile', link: routes.userProfile, icon: <AccountCircleIcon fontSize="small" /> },
    { label: 'Change Password', link: routes.userChangePass, icon: <LockIcon fontSize="small" /> },
    { label: 'Info Order', link: routes.userListOrder, icon: <ReceiptIcon fontSize="small" /> },
    { label: 'Info Bill', link: routes.userListBill, icon: <ReceiptIcon fontSize="small" /> },
    { label: 'Sign Out', link: routes.login, icon: <ExitToAppIcon fontSize="small" /> },
];
