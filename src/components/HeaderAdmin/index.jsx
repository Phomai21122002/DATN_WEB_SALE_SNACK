import React from 'react';
import { Link } from 'react-router-dom';
import { ClickAwayListener } from '@mui/material';

import logoSale from '~/assets/images/Logo-sales.png';
import routes from '~/config/routes';
import AvatarUser from '../AvatarUser';
import PopperProfile from '../PopperProfile';
import { options } from '../PopperProfile/Constains';

const HeaderAdmin = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <div className="flex items-center justify-center bg-white shadow-md">
            <div className="flex items-center justify-between max-w-[1080px] w-full px-6 py-1">
                <div className="flex items-center space-x-6">
                    <Link to={routes.home}>
                        <img src={logoSale} alt="Logo" className="w-14 h-14 object-contain cursor-pointer" />
                    </Link>
                    <div className="flex items-center font-bold text-[16px] uppercase">
                        <div className="flex items-center cursor-pointer">
                            <span>Bánh tráng phô mai</span>
                        </div>
                    </div>
                </div>
                <ClickAwayListener onClickAway={handleClose}>
                    <>
                        <button aria-describedby={id} type="button" onClick={handleClick}>
                            <AvatarUser />
                        </button>
                        <PopperProfile
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            options={options}
                        />
                    </>
                </ClickAwayListener>
            </div>
        </div>
    );
};

export default HeaderAdmin;
