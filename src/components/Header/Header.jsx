import React, { useEffect, useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge, Divider } from '@mui/material';

import logoSale from '~/assets/images/Logo-sales.png';
import { menuHeader } from './Constains';
import { Link, useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import { useStorage } from '~/Contexts';
import AvatarUser from '../AvatarUser';
import PopperProfile from '../PopperProfile';
import { options, optionsUser } from '../PopperProfile/Constains';
import PopperCart from '../PopperCart';
import useGetProducts from '~/hooks/useGetProducts';

const Header = () => {
    const { userData, dataCart, refRecommender, refNewest, refAllProduct } = useStorage();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElCart, setAnchorElCart] = useState(null);
    const [allNameProducts, setAllNameProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const filters = { PageSize: 1000 };
    const { data } = useGetProducts(filters);
    useEffect(() => {
        setAllNameProducts(data?.datas);
    }, [data]);

    useEffect(() => {
        if (searchQuery === '') {
            setFilteredResults([]);
        } else {
            const results = allNameProducts?.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()),
            );
            setFilteredResults(results);
        }
    }, [searchQuery, allNameProducts]);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchProduct = (product) => {
        navigate(routes.product.replace(':slug', product.slug));
        setFilteredResults([]);
    };

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

    const handleMenuClick = (index) => {
        const scrollTargets = [refRecommender, refNewest, refAllProduct];
        const targetRef = scrollTargets[index];
        if (targetRef?.current) {
            targetRef.current.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.warn('ref not ready for index:', index);
            setTimeout(scrollTargets, 50);
        }
    };

    const handleFindProduct = () => {
        console.log(searchQuery);
        const encodedName = encodeURIComponent(searchQuery);
        navigate(routes.find.replace(':name', encodedName));
    };

    const open = Boolean(anchorEl);
    const openCart = Boolean(anchorElCart);
    const idProfile = open ? 'simple-popover' : undefined;
    const idCart = openCart ? 'cart-popover' : undefined;
    return (
        <div className="flex items-center justify-center fixed top-0 left-0 w-full z-50 bg-white shadow-md">
            <div className="flex items-center justify-between max-w-[1080px] w-full px-6 py-1">
                <div className="flex items-center space-x-6">
                    <Link to={routes.home} className="mr-4">
                        <img src={logoSale} alt="Logo" className="w-14 h-14 object-contain cursor-pointer" />
                    </Link>
                    <div className="items-center space-x-4 font-bold text-[12px] uppercase hidden sm:flex">
                        {menuHeader.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleMenuClick(index)}
                                className="flex items-center space-x-1 hover:text-yellow-400 cursor-pointer"
                            >
                                {item.icon}
                                <span>{item.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center space-x-4 sm:space-x-6 text-lg font-bold text-[12px]">
                    <div className="flex relative items-center border border-gray-300 rounded-md mx-2 hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition duration-200">
                        <input
                            type="text"
                            name="no-autocomplete"
                            placeholder="Tìm kiếm..."
                            value={searchQuery ?? ''}
                            onChange={handleSearchInputChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleFindProduct();
                                }
                            }}
                            className="ml-2 w-full outline-none text-sm text-gray-700"
                            autoComplete="off"
                        />
                        <div
                            onClick={handleFindProduct}
                            className="rounded-tr-md rounded-br-md py-1 px-2 hover:bg-yellow-200 transition duration-200 cursor-pointer"
                        >
                            <SearchOutlinedIcon sx={{ fontSize: '20px' }} className="text-gray-500" />
                        </div>
                        {filteredResults?.length > 0 && (
                            <ul className="absolute max-h-[200px] overflow-y-auto top-[40px] left-0 w-full bg-white border border-gray-300 rounded-md shadow-md z-10">
                                {filteredResults?.map((product, index) => (
                                    <li
                                        onClick={() => handleSearchProduct(product)}
                                        key={index}
                                        className="p-2 text-sm hover:bg-gray-200 cursor-pointer"
                                    >
                                        {product.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <Link to={routes.cart} className="flex items-center hover:text-yellow-400 cursor-pointer">
                        <div
                            onMouseEnter={handleClickCart}
                            onMouseLeave={handleCloseCart}
                            className="flex items-center sm:space-x-2"
                        >
                            <button aria-describedby={idCart} variant="contained">
                                <Badge badgeContent={dataCart?.length} color="primary">
                                    <ShoppingCartOutlinedIcon sx={{ fontSize: '16px' }} />
                                </Badge>
                            </button>
                            {userData?.role?.name === 'User' && (
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
                                options={userData?.role?.name === 'Admin' ? options : optionsUser}
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
