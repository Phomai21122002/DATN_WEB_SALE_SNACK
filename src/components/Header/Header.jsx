import React, { useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge, Divider } from '@mui/material';

import logoSale from '~/assets/images/Logo-sales.png';
import { menuHeader } from './Constains';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import { useStorage } from '~/Contexts';
import AvatarUser from '../AvatarUser';
import PopperProfile from '../PopperProfile';
import { options, optionsUser } from '../PopperProfile/Constains';
import PopperCart from '../PopperCart';

const Header = () => {
    const { userData, dataCart } = useStorage();
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElCart, setAnchorElCart] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickCart = (event) => {
        setAnchorElCart(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseCart = () => {
        setAnchorElCart(null);
    };

    const open = Boolean(anchorEl);
    const openCart = Boolean(anchorElCart);
    const idProfile = open ? 'simple-popover' : undefined;
    const idCart = openCart ? 'cart-popover' : undefined;

    return (
        <div className="flex items-center justify-center fixed top-0 left-0 w-full z-50 bg-white shadow-md">
            <div className="flex items-center justify-between max-w-[1080px] w-full px-6 py-1">
                <div className="flex items-center space-x-6">
                    <Link to={routes.home}>
                        <img src={logoSale} alt="Logo" className="w-14 h-14 object-contain cursor-pointer" />
                    </Link>
                    <div className="flex items-center space-x-4 font-bold text-[12px] uppercase">
                        {menuHeader.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-1 hover:text-yellow-400 cursor-pointer"
                            >
                                {item.icon}
                                <span>{item.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center space-x-6 text-lg font-bold text-[12px] uppercase">
                    <div className="flex items-center border border-gray-300 rounded-md pl-2 hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition duration-200">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="ml-2 w-full outline-none text-sm text-gray-700"
                        />
                        <div className="rounded-tr-md rounded-br-md py-1 px-2 hover:bg-yellow-200 transition duration-200 cursor-pointer">
                            <SearchOutlinedIcon sx={{ fontSize: '20px' }} className="text-gray-500" />
                        </div>
                    </div>
                    <Link to={routes.cart} className="flex items-center space-x-2 hover:text-yellow-400 cursor-pointer">
                        <div
                            onMouseEnter={handleClickCart}
                            onMouseLeave={handleCloseCart}
                            className="flex items-center space-x-2"
                        >
                            <button aria-describedby={idCart} variant="contained">
                                <Badge badgeContent={dataCart.length} color="primary">
                                    <ShoppingCartOutlinedIcon sx={{ fontSize: '16px' }} />
                                </Badge>
                            </button>
                            {userData.role === 'User' && (
                                <PopperCart
                                    id={idCart}
                                    open={openCart}
                                    anchorEl={anchorElCart}
                                    onClose={handleCloseCart}
                                    dataCart={dataCart}
                                />
                            )}
                        </div>
                    </Link>
                    {userData && Object.keys(userData).length > 0 ? (
                        <>
                            <button aria-describedby={idProfile} variant="contained" onClick={handleClick}>
                                <AvatarUser />
                            </button>
                            <PopperProfile
                                id={idProfile}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                options={userData.role === 'Admin' ? options : optionsUser}
                            />
                        </>
                    ) : (
                        <div className="flex items-center space-x-2 font-bold text-[12px] uppercase">
                            <Link
                                to={routes.signup}
                                className="flex items-center space-x-1 hover:text-yellow-400 cursor-pointer"
                            >
                                Đăng ký
                            </Link>
                            <Divider orientation="vertical" className="!h-4 !border-gray-300 !border-[1px]" />
                            <Link
                                to={routes.login}
                                className="flex items-center space-x-1 hover:text-yellow-400 cursor-pointer"
                            >
                                Đăng nhập
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
