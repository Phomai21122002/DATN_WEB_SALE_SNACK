import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import useGetCarts from '~/hooks/useGetCarts';
import useGetProfile from '~/hooks/useGetProfile';

export const StorageContext = createContext();

function GlobalStates({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [checkedCart, setCheckedCart] = useState([]);
    const refAllProduct = useRef(null);
    const refRecommender = useRef(null);
    const refNewest = useRef(null);
    const token = Cookies.get('authToken');
    const { data: userData, refetchProfile } = useGetProfile({
        enabled: !!token && !!isLoggedIn,
    });
    const { data: dataCart, refetchListCart } = useGetCarts(userData?.id);

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
        }
    }, [token]);

    const states = {
        token,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        dataCart,
        checkedCart,
        setCheckedCart,
        refetchProfile,
        refetchListCart,
        refAllProduct,
        refRecommender,
        refNewest,
    };

    return <StorageContext.Provider value={states}>{children}</StorageContext.Provider>;
}

export default GlobalStates;

export const useStorage = () => {
    const context = useContext(StorageContext);

    if (!context) {
        throw new Error('useEditCompanyContext must be used within a EditCompanyProvider');
    }

    return context;
};
