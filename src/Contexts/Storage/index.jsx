import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';
import { GetCarts } from '~/services/Cart';
import { GetProfile } from '~/services/User';

export const StorageContext = createContext();

function GlobalStates({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});
    const [dataCart, setDataCart] = useState([]);
    const getDataCartNow = async () => {
        const token = Cookies.get('authToken');
        if (token && userData.id) {
            const res = await GetCarts(userData.id);
            setDataCart(res);
        }
    };

    useEffect(() => {
        const getData = async () => {
            const token = Cookies.get('authToken');
            if (token) {
                console.log('globalstates');
                const res = await GetProfile();
                setUserData(res);
                setIsLoggedIn(true);
            }
        };
        getData();
    }, []);

    const states = {
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        dataCart,
        setDataCart,
        getDataCartNow,
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
