import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import routes, { routesAdmin, routesUser } from '../../config/routes';
import { useStorage } from '~/Contexts';

export const RequiredAuth = () => {
    const navigate = useNavigate();
    const token = Cookies.get('authToken');
    const { userData, setIsLoggedIn } = useStorage();
    const location = useLocation();

    // useEffect(() => {
    //     const NavigateRoute = async () => {
    //         if (!!token) {
    //             const currentPath = location.pathname;
    //             setIsLoggedIn(true);
    //             if (userData) {
    //                 if (userData.role.name === 'User' && Object.values(routesUser).includes(currentPath)) {
    //                     return;
    //                 } else if (userData.role.name === 'Admin' && Object.values(routesAdmin).includes(currentPath)) {
    //                     return;
    //                 } else if (userData.role && userData.role.name === 'Admin') {
    //                     navigate(routes.admin);
    //                 } else if (userData.role && userData.role.name === 'User') {
    //                     navigate(routes.home);
    //                 } else {
    //                     navigate(routes.login);
    //                 }
    //             }
    //         } else {
    //             navigate(routes.login);
    //         }
    //     };
    //     NavigateRoute();
    //     // eslint-disable-next-line
    // }, [token]);

    return <Outlet />;
};
