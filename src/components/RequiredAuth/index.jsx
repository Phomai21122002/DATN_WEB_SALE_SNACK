import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

import routes, { routesAdmin, routesUser } from '../../config/routes';
import { role } from '~/pages/Login/constants/logo';
import { useStorage } from '~/Contexts';

export const RequiredAuth = () => {
    const navigate = useNavigate();
    const token = Cookies.get('authToken');
    const { setUserData, setIsLoggedIn } = useStorage();
    const location = useLocation();

    useEffect(() => {
        if (!!token) {
            const decodedToken = jwtDecode(token);
            decodedToken.role = decodedToken[role];
            delete decodedToken[role];
            setUserData(decodedToken);
            const currentPath = location.pathname;

            setIsLoggedIn(true);
            if (decodedToken.role === 'User' && Object.values(routesUser).includes(currentPath)) {
                return;
            } else if (decodedToken.role === 'Admin' && Object.values(routesAdmin).includes(currentPath)) {
                return;
            } else if (decodedToken && decodedToken.role === 'Admin') {
                navigate(routes.admin);
            } else if (decodedToken && decodedToken.role === 'User') {
                navigate(routes.home);
            } else {
                navigate(routes.login);
            }
        } else {
            navigate(routes.login);
        }
        // eslint-disable-next-line
    }, [token]);

    return <Outlet />;
};
