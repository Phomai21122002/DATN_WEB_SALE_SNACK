import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

import routes, { routesAdmin, routesUser } from '../../config/routes';
import { useStorage } from '~/Contexts';
import { GetProfile } from '~/services/User';

export const RequiredAuth = () => {
    const navigate = useNavigate();
    const token = Cookies.get('authToken');
    const { setUserData, setIsLoggedIn } = useStorage();
    const location = useLocation();

    useEffect(() => {
        const NavigateRoute = async () => {
            if (!!token) {
                console.log('requiredAuth');
                const profile = await GetProfile();
                setUserData(profile);
                const currentPath = location.pathname;
                setIsLoggedIn(true);
                if (profile.role.name === 'User' && Object.values(routesUser).includes(currentPath)) {
                    return;
                } else if (profile.role.name === 'Admin' && Object.values(routesAdmin).includes(currentPath)) {
                    return;
                } else if (profile.role && profile.role.name === 'Admin') {
                    navigate(routes.admin);
                } else if (profile.role && profile.role.name === 'User') {
                    navigate(routes.home);
                } else {
                    navigate(routes.login);
                }
            } else {
                navigate(routes.login);
            }
        };
        NavigateRoute();
        // eslint-disable-next-line
    }, [token]);

    return <Outlet />;
};
