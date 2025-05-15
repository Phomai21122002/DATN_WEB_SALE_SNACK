import { Avatar } from '@mui/material';
import { useStorage } from '~/Contexts';
import { stringAvatar } from '~/utils/color';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function AvatarUser() {
    const { userData } = useStorage();
    console.log(userData);
    return (
        <div className="flex items-center space-x-6 text-lg font-bold text-[12px] uppercase">
            <div className="relative flex items-center justify-center cursor-pointer">
                <Avatar
                    {...stringAvatar(userData?.firstName)}
                    alt={userData?.firstName}
                    src={userData?.url || ''}
                    sx={{ ...stringAvatar(userData?.firstName)?.sx, width: 44, height: 44, marginRight: '8px' }}
                />
                {userData?.role === 'Admin' && (
                    <>
                        <div className="flex items-center justify-center mr-1 font-bold text-[12px]">
                            {userData?.firstName}
                        </div>
                        <KeyboardArrowDownIcon />
                    </>
                )}
            </div>
        </div>
    );
}

export default AvatarUser;
