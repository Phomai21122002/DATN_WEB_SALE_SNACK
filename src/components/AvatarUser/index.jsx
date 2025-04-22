import { Avatar } from '@mui/material';
import { useStorage } from '~/Contexts';
import { stringAvatar } from '~/utils/color';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function AvatarUser() {
    const { userData } = useStorage();

    return (
        <div className="flex items-center space-x-6 text-lg font-bold text-[12px] uppercase">
            <div className="relative flex items-center justify-center cursor-pointer">
                <Avatar
                    {...stringAvatar(userData?.sub)}
                    alt={userData?.sub}
                    src={userData?.avatarUrl || ''}
                    sx={{ ...stringAvatar(userData?.sub)?.sx, width: 32, height: 32, marginRight: '8px' }}
                />
                {userData.role === 'Admin' && (
                    <>
                        <div className="flex items-center justify-center mr-1 font-bold text-[12px]">
                            {userData?.sub}
                        </div>
                        <KeyboardArrowDownIcon />
                    </>
                )}
            </div>
        </div>
    );
}

export default AvatarUser;
