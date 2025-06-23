import axios from 'axios';
import Cookies from 'js-cookie';

export const refreshAccessToken = async ({ token, refreshToken }) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/Auth/Refresh`, {
            expiredToken: token,
            refreshToken: refreshToken,
        });
        Cookies.set('authToken', response.data.token);
        Cookies.set('refreshToken', response.data.refreshToken);
        return response.data.token;
    } catch (error) {
        console.error('Unable to refresh token', error);
        return null;
    }
};
